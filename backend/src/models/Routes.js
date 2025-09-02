const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    start: {
        name: String,
        coordinates: {
            lat: Number,
            lon: Number
        }
    },
    destination: {
        name: String,
        coordinates: {
            lat: Number,
            lon: Number
        }
    },
    mode: {
        type: String,
        enum: ["car", "cycle", "walk", "two-wheeler", "public-transport"],
        required: true
    },
    distance: Number,   // km
    duration: Number,   // mins
    carbonEmitted: {   // estimated kg CO2 emitted for chosen mode
        type: Number,
        default: 0
    },
    carbonSaved: {     // estimated kg CO2 saved compared to baseline mode
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
});

module.exports = mongoose.model("Route", routeSchema);