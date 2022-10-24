var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const testAPI = require("./routes/testAPI");
const cors = require("cors");
const pug = require("pug");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const bodyParser = require("body-parser");
var app = express();
// require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
app.set("view engine", pug);

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPI);

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

// app.get("/receipt/:id", (req, res) => {
//   const id = req.params.id;
//   Sale.findById(id)
//     .then((sale) => {
//       if (!sale) {
//         //handle error when the donor is not found
//         res.redirect("/error");
//       }
//       // res.render("success.pug", { sale });
//       res.render(`${process.env.CLIENT_URL}/checkout-success`);
//     })
//     .catch((e) => {
//       res.redirect("/error");
//     });
// });
// app.get("/error", (req, res) => {
//   res.render("error.pug");
// });
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
