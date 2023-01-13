const Joi = require("joi");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};

// Joi.objectid is used to validate that the id given by the client is a valid Id
