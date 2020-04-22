# Express Parameter Pollution

Parameter pollution is dangerous against Express based applications as most developers ignore the fact that, if you pass multiple parameters with the same name in the URL, Express will make an array out of them. This would let attacker make an error in your application (If you used it as a string, for example, myParameter.replace("Alice", "Bob") This would cause an error);

This middleware will automatically stop the attacker or intercept the request and send it to your handler function, so you do whatever you want with the request.

### Usage
Express Parameter Pollution is really easy to add to your existing project

```js
const parameterPollution = require("express-parameter-pollution");

app.use(parameterPollution());
```

### Customization
Express Parameter Pollution offers you few customizations, like toggling logging and adding your own function for handling parameter pollution requests.

```js
const parameterPollution = require("express-parameter-pollution");

app.use(parameterPollution({
    log: true,
    handler: (req, res, next) => {
        res.send("Hello there user! Please stop trying to launch parameter pollution attack against our website!");
    }
})):
```

### Test
Express Parameter Pollution offers you few customizations, like toggling logging and adding your own function for handling parameter pollution requests.

```js
const express = require("express");
const parameterPollution = require("express-parameter-pollution");

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
```