const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Route = require("../models/Routes");

// Get total CO2 saved, total trips, total distance, and this month’s CO2 saved
router.get("/dashboard-stats", auth, async (req, res) => {
    try {
        const userId = req.user;

        // Fetch all user routes
        const routes = await Route.find({ user: userId });

        let totalCO2Saved = 0;
        let totalDistance = 0;
        let totalTrips = routes.length;

        let co2SavedThisMonth = 0;
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        routes.forEach(route => {
            totalCO2Saved += route.carbonSaved || 0;
            totalDistance += route.distance || 0;
            if (route.createdAt >= firstDayOfMonth) {
                co2SavedThisMonth += route.carbonSaved || 0;
            }
        });

        res.json({
            totalCO2Saved: totalCO2Saved.toFixed(2),
            totalDistanceKm: (totalDistance / 1000).toFixed(2),
            totalTrips,
            co2SavedThisMonth: co2SavedThisMonth.toFixed(2),
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ error: "Failed to fetch dashboard stats" });
    }
});

// Get monthly CO2 savings for the last 6 months
router.get("/monthly-co2", auth, async (req, res) => {
    try {
        const userId = req.user;
        const routes = await Route.find({ user: userId });

        const now = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Create an object to hold CO2 sums per month for last 6 months
        const monthData = {};
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            monthData[key] = { month: monthNames[d.getMonth()], co2Saved: 0, trips: 0 };
        }

        routes.forEach(route => {
            if (!route.createdAt) return;
            const year = route.createdAt.getFullYear();
            const month = route.createdAt.getMonth() + 1;
            const key = `${year}-${month}`;
            if (monthData[key]) {
                monthData[key].co2Saved += route.carbonSaved || 0;
                monthData[key].trips++;
            }
        });

        // Convert to array sorted by date
        const result = Object.values(monthData).map(item => ({
            month: item.month,
            co2Saved: +item.co2Saved.toFixed(2),
            trips: item.trips
        }));

        res.json(result);

    } catch (error) {
        console.error("Monthly CO2 error:", error);
        res.status(500).json({ error: "Failed to fetch monthly CO2 savings" });
    }
});

// Transport mode distribution (percentage)
router.get("/transport-modes", auth, async (req, res) => {
    try {
        const userId = req.user;
        const routes = await Route.find({ user: userId });
        const totalTrips = routes.length;
        if (totalTrips === 0) return res.json([]);

        const counts = {};
        routes.forEach(route => {
            counts[route.mode] = (counts[route.mode] || 0) + 1;
        });

        const distribution = Object.entries(counts).map(([mode, count]) => ({
            mode,
            value: Math.round((count / totalTrips) * 100)
        }));

        res.json(distribution);

    } catch (error) {
        console.error("Transport mode distribution error:", error);
        res.status(500).json({ error: "Failed to fetch transport mode distribution" });
    }
});

// Get 5 recent trips
router.get("/recent-trips", auth, async (req, res) => {
    try {
        const userId = req.user;
        const trips = await Route.find({ user: userId }).sort({ createdAt: -1 }).limit(5);
        const formatted = trips.map(trip => ({
            id: trip._id,
            from: trip.start?.name || "",
            to: trip.destination?.name || "",
            mode: trip.mode,
            distance: +(trip.distance).toFixed(3),
            co2Saved: +trip.carbonSaved.toFixed(2),
            date: trip.createdAt.toISOString().split("T")[0]
        }));
        res.json(formatted);
    } catch (error) {
        console.error("Recent trips error:", error);
        res.status(500).json({ error: "Failed to fetch recent trips" });
    }
});

module.exports = router;