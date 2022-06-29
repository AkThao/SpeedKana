const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const statsRouter = require("./routes/stats-route");

// Set default port for express app
const PORT = process.env.PORT || 4000;

// Create express app
const app = express();

// Apply middleware - this should stay above routes
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Default Hello World route because why not
app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello World!" });
});

// Implement stats route
app.use("/api/stats", statsRouter);

// Implement 500 error route
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong on the server.");
});

// Implement 404 error route
app.use((err, req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));