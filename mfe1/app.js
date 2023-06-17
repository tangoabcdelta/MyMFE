var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var process = require("process");
var package = require("./package.json");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  try {
    console.log("ENV_VARIABLE_1", process.env.ENV_VARIABLE_1);
    console.log(
      "ENV_VARIABLE_SECRETS",
      process.env.ENV_VARIABLE_SECRETS ? "*****" : "Not found"
    );
  } catch (e) {
    console.log("Env Variables not set!");
  }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/healthcheck", (req, res) => {
  res.send({
    appName: package.name,
    appVersion: package.version,
    port: package.config.port,
  });
});
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

module.exports = app;
