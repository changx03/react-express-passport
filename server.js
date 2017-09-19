var express = require("express");
var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

var app = express();
// app.disable("x-powered-by");
app.use(express.static(__dirname + "/build"));

app.set("port", process.env.PORT || 3000);
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.use(function(err, req, res, next) {
  console.log("Error : " + err.message);
  next();
});

app.listen(app.get("port"), function() {
  console.log(
    "Index dir:" +
      __dirname +
      "/build/index.html" +
      "\nExpress started on http://localhost:" +
      app.get("port") +
      " press Ctrl-C to terminate"
  );
});
