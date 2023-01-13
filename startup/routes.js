const express = require("express");
const error = require("../middleware/error");
const users = require("../routes/users");
const auth = require("../routes/auth");
const paystack = require("../routes/paystack");
const orders = require("../routes/orders");
const cors = require("cors");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/paystack", paystack);
  app.use("/api/orders", orders);
  app.use(error);
};
