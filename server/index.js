const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));

app.once('open', function() {
    console.log("Connection Successful!");
});

// simple route
app.get("/mensen/:id/", (req, res) => {
    res.json({ message: "Welcome to Appeteria application." });
});





// set port, listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});