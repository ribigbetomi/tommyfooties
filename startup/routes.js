const express = require("express");
const error = require("../middleware/error");
const users = require("../routes/users");
const auth = require("../routes/auth");
const stripe = require("../routes/stripe");
const paystack = require("../routes/paystacks");
const cors = require("cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/paystack", paystack);
  app.use("/stripe", stripe);
  app.use(error);
};
