var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//connect MongoDB database
const url = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@clustertienbao-shard-00-00.kppox.mongodb.net:27017,clustertienbao-shard-00-01.kppox.mongodb.net:27017,clustertienbao-shard-00-02.kppox.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-l4yyn1-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? err : " connection true");
  }
);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
