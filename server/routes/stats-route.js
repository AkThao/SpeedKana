// Import express
const express = require("express");

// Import stats controller
const statsRoutes = require("./../controllers/stats-controller");

// Create router
const router = express.Router();

// In server.js, the stats route is specified as "/api/stats"
// This means that the stats route will be at http://localhost:4000/api/stats
//     "/all" -> "/api/stats/all"
//     "/create" -> "/api/stats/create", etc.

// Add route for GET request to retrieve all test stats
router.get("/all", statsRoutes.getAllTests);

// Add router for POST request to store new test stats
router.post("/create", statsRoutes.createTest);

// Export router
module.exports = router;