const config = require("config");
// require("dotenv").config();

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};

// module.exports = function () {
//   if (!process.env.JWT_SECRET_KEY) {
//     throw new Error("FATAL ERROR: JWT_SECRET_KEY is not defined.");
//   }
// };
