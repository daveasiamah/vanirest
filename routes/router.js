/*
// Implement Routing with Switch Case and regexp
// */

// Define the handlers
let handlers = {};

//Sample handlers
handlers.sample = function (data, callback) {
  //Callback an http status code, and a payload object
  callback(406, { name: "sample handler" });
};

handlers.notFound = function (data, callback) {
  callback(404, { message: "Route Not Found." });
};

//Define a request Router
let router = {
  sample: handlers.sample,
};
