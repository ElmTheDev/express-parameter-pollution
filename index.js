const defaultOptions = {
    log: false, // Logs the parameter pollution in console
    handler: null // Function that will be called when parameter pollution is detected
};

let options = null;

const preventParamterPollution = (request, response, next) => {
    for (let key in request.query) {
        if (typeof request.query[key] === "object") {
            if (options.log)
                console.log(`Parameter pollution detected! Path: ${request.path}`, request.query);

            if (!options.handler)
                return response.status(403).send("Parameter pollution prevented");
            else
                return options.handler(request, response, next);
        }
    }

    next();
};

module.exports = (userOptions) => {
    options = userOptions || defaultOptions;

    return preventParamterPollution;
}