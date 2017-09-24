var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var flash = require("express-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var user = require("./backend/user.js");
var mongoose = require("mongoose");

// debugger;

// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config');
// var compiler = webpack(webpackConfig);

var app = express();
const SECRET = "secret cat";
const PORT = 3283;
// app.disable("x-powered-by");

// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, 
//     publicPath: webpackConfig.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler));

// Mongoose: mpromise (mongoose's default promise library) is deprecated
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/loginapp", {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("MongoDB is connecting to mongodb://localhost/loginapp");

    // bodyParser Middleware
    // session store uses MemoryStore by default
    // const sessionStore = new session.MemoryStore;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // Set static public folder
    app.use(express.static(__dirname + "/build"));

    // Express-session
    app.use(cookieParser(SECRET));
    app.use(
        session({
            cookie: {
                maxAge: 60000
            },
            // store: sessionStore,
            secret: SECRET,
            saveUninitialized: true,
            resave: true
        })
    );

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.set("port", process.env.PORT || PORT);

    // Miniapp handles login, logout and register
    app.use("/user", user);

    app.get(/.*/, function (req, res) {
        res.sendFile(path.join(__dirname + "/index.html"));
    });

    app.use(function (err, req, res, next) {
        console.log("Error : " + err.message);
        next();
    });

    app.listen(app.get("port"), function () {
        console.log(
            "Express started on http://localhost:" +
            app.get("port") +
            " press Ctrl-C to terminate"
        );
    });
});

// Express-validator
// app.use(
//     expressValidator({
//         errorFormatter: function (param, msg, value, location) {
//             var namespace = param.split(","),
//                 root = namespace.shift(),
//                 formParam = root;

//             while (namespace.length) {
//                 formParam += "[" + namespace.shift() + "]";
//             }
//             return {
//                 param: formParam,
//                 msg: msg,
//                 value: value,
//                 location: location
//             };
//         }
//     })
// );

// Connect-flash
// app.use(flash());
// // Global variables for flash
// app.use(function (req, res, next) {
//     res.locals.success_msg = req.flash("success_msg");
//     res.locals.error_msg = req.flash("error_msg");
//     res.locals.error = req.flash("error");
//     res.locals.user = req.user || null;
//     next();
// });

// TODO: change login, logout, register to under /user/ 
// var ensureAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated())
//         return next();
//     else {
//         // req.flash("error_msg", "Your are not logged in");
//         res.redirect("/user/login");
//     }
// }

// app.get("/index", ensureAuthenticated(req, res, next));
