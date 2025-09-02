const axios = require("axios");
require('dotenv').config();

const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY; // store key in .env

async function geocodeAddress(address) {
    try {
        const url = `https://us1.locationiq.com/v1/search`;
        const response = await axios.get(url, {
            params: {
                key: LOCATIONIQ_API_KEY,
                q: address,
                format: "json",
                limit: 1
            }
        });

        if (response.data && response.data.length > 0) {
            const { lat, lon, display_name } = response.data[0];
            return { lat, lon, display_name };
        } else {
            return null;
        }
    } catch (err) {
        console.error("Geocoding error:", err.message);
        return null;
    }
}

module.exports = geocodeAddress;