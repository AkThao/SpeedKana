const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello World!" });
});

app.post("/api/world", (req, res) => {
    console.log(req.body);
    res.send(`Got a POST request, the message was: ${req.body.post}`);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));