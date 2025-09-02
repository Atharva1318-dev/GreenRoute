const express = require("express");
const axios = require("axios");
const Route = require("../models/Routes");
const router = express.Router();
const auth = require("../middleware/auth");
const geocodeAddress = require("../services/forwardGeocode");
require('dotenv').config();

const ORS_API_KEY = process.env.ORS_API_KEY;
const CLIMATIQ_KEY = process.env.CLIMATIQ_API_KEY;

// Helper function for Climatiq CO2 estimate
const getCO2Estimate = async (activityId, distanceInKm) => {
    if (!activityId || distanceInKm <= 0) return 0;
    try {
        const climatiqResp = await axios.post(
            "https://api.climatiq.io/data/v1/estimate",
            {
                emission_factor: {
                    activity_id: activityId,
                    data_version: "^25"
                },
                parameters: {
                    distance: distanceInKm,
                    distance_unit: "km"
                }
            },
            {
                headers: { Authorization: `Bearer ${CLIMATIQ_KEY}` }
            }
        );
        return climatiqResp.data.co2e || 0;
    } catch (err) {
        console.error("Climatiq API Error:", err.response?.data || err.message);
        return 0;
    }
};

// POST /api/geocode/forward
router.post("/forward", auth, async (req, res) => {
    const { start, destination, mode, tripDate, notes } = req.body;

    if (!start || !destination) {
        return res.status(400).json({ error: "Start and destination addresses are required" });
    }

    try {
        const { lat: startLat, lon: startLon } = await geocodeAddress(start);
        const { lat: destLat, lon: destLon } = await geocodeAddress(destination);

        const orsProfiles = {
            car: "driving-car",
            "two-wheeler": "cycling-electric",
            cycle: "cycling-regular",
            walk: "foot-walking",
            "public-transport": "driving-car"
        };
        const profile = orsProfiles[mode] || "driving-car";

        let distanceInKm = 0;
        let durationInMin = 0;
        let geometry = null;

        try {
            const response = await axios.post(
                `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
                {
                    coordinates: [
                        [startLon, startLat],
                        [destLon, destLat]
                    ],
                },
                {
                    headers: {
                        Authorization: ORS_API_KEY,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const route = response.data.features[0];
            if (!route || !route.properties || !route.properties.summary) {
                console.error("Unexpected ORS response shape:", response.data);
                return res.status(500).json({ error: "Invalid ORS response" });
            }

            distanceInKm = (route.properties.summary.distance || 0) / 1000;
            durationInMin = (route.properties.summary.duration || 0) / 60;
            geometry = route.geometry || null;

        } catch (err) {
            console.error("Route error:", err.response?.data || err.message);
            return res.status(500).json({
                error: "Failed to fetch route from ORS",
                details: err.response?.data || err.message
            });
        }

        // Determine Climatiq activity ID for chosen mode
        let climatiqActivityId = null;
        switch (mode) {
            case "car":
            case "public-transport":
                climatiqActivityId = "passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na";
                break;
            case "two-wheeler":
                climatiqActivityId = "passenger_vehicle-vehicle_type_motorbike-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na"; // try this first
                // Or, as backup:
                // climatiqActivityId = "passenger_vehicle-vehicle_type_small_motorbike-fuel_source_na-engine_size_na-vehicle_age_na-vehicle_weight_na";
                break;
            case "cycle":
            case "walk":
                climatiqActivityId = null;
                break;
            default:
                climatiqActivityId = "passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na";
        }


        // Baseline activity ID for car emissions (used for comparison)
        const baselineActivityId = "passenger_vehicle-vehicle_type_car-fuel_source_petrol-engine_size_na-vehicle_age_na-vehicle_weight_na";

        // Get CO2 emitted for chosen mode
        const chosenCo2Kg = await getCO2Estimate(climatiqActivityId, distanceInKm);

        // Always get baseline car CO2 emitted for the same distance
        const baselineCo2Kg = await getCO2Estimate(baselineActivityId, distanceInKm);
        console.log("Car co2: " + baselineCo2Kg);
        console.log("Choosen co2: " + chosenCo2Kg);

        // Carbon saved = baseline emissions - chosen emissions; minimum 0
        const co2Saved = (baselineCo2Kg - chosenCo2Kg) > 0 ? (baselineCo2Kg - chosenCo2Kg) : 0;

        const newRoute = new Route({
            user: req.user,
            start: {
                name: start,
                coordinates: { lat: startLat, lon: startLon }
            },
            destination: {
                name: destination,
                coordinates: { lat: destLat, lon: destLon }
            },
            mode,
            distance: distanceInKm,
            duration: durationInMin,
            carbonEmitted: chosenCo2Kg,
            carbonSaved: co2Saved,
            notes
        });

        await newRoute.save();

        res.json({
            message: "Route saved successfully",
            route: newRoute,
            distance_km: distanceInKm.toFixed(2),
            duration_min: durationInMin.toFixed(2),
            carbon_emitted_kg: chosenCo2Kg.toFixed(3),
            carbon_saved_kg: co2Saved.toFixed(3),
            mode
        });

    } catch (err) {
        console.error("Geocoding error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;