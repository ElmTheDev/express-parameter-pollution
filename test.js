const express = require("express");
const parameterPollution = require("./index.js");

const app = express();

app.use(parameterPollution());

app.use("*", (req, res) => {
    if(Object.keys(req.query).length) {
        let responseString = "You sent following parameters: <br>";
        for(let key in req.query) {
            responseString += `${key}: ${req.query[key].replace("Bob", "Alice")}<br>`;
        }

        return res.send(responseString);
    }

    res.send("<a href='/?name=My name is Bob'>Regular request</a><br><a href='/?name=My name is Bob&name=My name is not Bob'>Parameter Pollution Request</a>");
});

app.listen(3001, () => {
    console.log("Test server listening at port 3001");
});