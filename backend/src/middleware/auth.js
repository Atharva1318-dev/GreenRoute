const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
//We are making this middleware in order to check whether the user is logged in or not because accessing the protected route, like the dashboard can be accessed only by logged in user
// This is done by verifying a JWT token sent with the request.

// 1. User logs in → Server sends token → Frontend stores it(usually in localStorage).

// 2. Next time user accesses protected route → Frontend sends token in header.

// 3. This middleware checks:

// 4. Is token present ?

// 5. Is token valid ?

// 6. If valid then let user through and attach user ID to req.

// 7. If not then deny access.


const auth = (req, res, next) => {
    // Get the token first

    const token = req.cookies.token;

    // If there’s no token → means user is not logged in.
    if (!token) return res.status(401).json({ message: "No auth token" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.userId;
        //console.log("User: " + req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: "token verification failed" });
    }
};



module.exports = auth;