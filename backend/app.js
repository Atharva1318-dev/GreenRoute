const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protected");
const geocodeRoutes = require("./src/routes/geocode");
const dashboardRoutes = require("./src/routes/protected");
const openRouteService = require("./src/routes/openRouteService");
const auth = require("./src/middleware/auth");


require('dotenv').config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json()); //The json() method specifically parses incoming requests where the Content-Type is application/json. It converts the raw JSON data from the request body into a JavaScript object.
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(cookieParser());
app.use(express.json());


mongoose.connect(process.env.ATLASDB_URL)
    .then(() => console.log('DB Connected!'));

app.use("/auth", authRoutes);
app.use("/route", openRouteService);
app.use("/geocode", geocodeRoutes);
app.use("/dashboard", protectedRoutes);

app.get("/", (req, res) => {
    res.send("Hello there");
});

app.listen(PORT, () => {
    console.log(`server listening at port: ${PORT}`);
});