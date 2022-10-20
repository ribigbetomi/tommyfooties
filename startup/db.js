const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  // const uri = process.env.DB_URI;

  const db = config.get("db");

  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
  // mongoose
  //   .connect(db)
  //   .then(() =>
  //     winston.info(`Connected to mongodb://localhost/tommyfooties...`)
  //   );
  // const uri = process.env.DB_URI;

  // mongoose
  //   .connect(uri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  //   .then(() => console.log("MongoDB connection established..."))
  //   .catch((error) =>
  //     console.error("MongoDB connection failed:", error.message)
  //   );
};
