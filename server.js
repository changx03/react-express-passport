const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("./backend/user.js");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

// debugger;

// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config');
// var compiler = webpack(webpackConfig);

const app = express();
const SECRET = "secret cat";
const PORT = 3283;
app.set("port", process.env.PORT || PORT);

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
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    // we're connected!
    console.log("MongoDB is connecting to mongodb://localhost/loginapp");

    // bodyParser Middleware
    // session store uses MemoryStore by default
    // const sessionStore = new session.MemoryStore;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true 
    }));

    // Set static public folder
    app.use(express.static(__dirname + "/build"));

    // Express-session
    app.use(cookieParser(SECRET));
    app.use(
        session({
            cookie: {
                maxAge: 60000, // session should not apply maxAge nor expires, Used by FlashMessage
                sameSite: true, // apply SameSite tag
                secure: false // Should be true in production. Use HTTPS. default to false
            },
            store: new MongoStore({
                mongooseConnection: db
            }),
            secret: SECRET,
            saveUninitialized: true,
            resave: true
        })
    );

    // Initialize Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // Connect-flash
    app.use(flash());

    // // Global variables for flash
    // app.use(function (req, res, next) {
    //     // res.locals.success_msg = req.flash("success_msg");
    //     // res.locals.error_msg = req.flash("error_msg");
    //     res.locals.error = req.flash("error");
    //     res.locals.user = req.user || null;
    //     next();
    // });

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
