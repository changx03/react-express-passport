var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var user = require("./backend/user.js");

mongoose.createConnection("mongodb://localhost/loginapp");

var app = express();
// app.disable("x-powered-by");

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set static public folder
app.use(express.static(__dirname + "/build"));

// Express-session
app.use(
  session({
    secret: "This is a secret!",
    saveUninitialized: true,
    resave: true
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Express-validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value, location) {
      var namespace = param.split(","),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: fromParam,
        msg: msg,
        value: value,
        location: location
      };
    }
  })
);

// Connect-flash
app.use(flash());
// Global variables for flash
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.set("port", process.env.PORT || 3283);

app.use("/register", user);

// app.post("/register", (req, res) => {
//   var name = req.body.name,
//     email = req.body.email,
//     password = req.body.password,
//     password2 = req.body.password2;

//   console.log(name, email, password);
//   res.redirect("/welcome");
// });

app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.use(function(err, req, res, next) {
  console.log("Error : " + err.message);
  next();
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      " press Ctrl-C to terminate"
  );
});
