var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const testAPI = require("./routes/testAPI");
const cors = require("cors");
const stripe = require("./routes/stripe");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();
require("dotenv-extended").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPI);
app.use("/api/stripe", stripe);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connection established..."))
//   .catch((error) => console.error("MongoDB connection failed:", error.message));

module.exports = app;
