//@ts-check
var express = require("express");
var {
    check,
    validationResult
} = require("express-validator/check");
var User = require("./db.js");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var async = require("async");

var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Path: ", req.path, "Time: ", Date.now());
    next();
});

// req.path in miniapp does not contain entry
// check each body property with express-validator
router.post("/register", [
    check("username").exists(),
    check("password", "passwords must be at least 5 chars long and contain one number").isLength({
        min: 5
    }).matches(/\d/),
    check("password2", "passwords must match").exists().custom(
        (value, {
            req
        }) => {
            return value === req.body.password;
        }),
    check("email", "must be an email").isEmail()
], (req, res) => {
    var username = req.body.username,
        email = req.body.email,
        password = req.body.password;

    // check validation
    console.log(username, email, password);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({   // 422 unprocessable entity
            success: false,
            errors: errors.mapped()
        });
    }

    // Save user
    var newUser = new User({
        username: username,
        email: email,
        password: password
    });

    User.createUser(newUser, (err, user) => {
        if (err && err.name === 'MongoError' && err.code === 11000) {
            return res.status(422).json({
                success: false,
                msg: "The username or email already exists. Please try another one."
            });
        }
        else {
            console.log("Added: " + user);
            // Success
            return res.status(201).json({
                success: true,
                msg: "You are registered and can now login."
            });
        }
    });
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        User.getUserByUserName(username, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: "Unknown user"
                });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (isMatch)
                    return done(null, user);
                else
                    return done(null, false, {
                        message: "Invalid password"
                    });
            })
        })
    }
));

// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//     User.getUserByID(id, function (err, user) {
//         done(err, user);
//     });
// });

// router.post("/login", passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
// }), (req, res) => {
//     res.redirect("/");
// });

// router.get("/logout", (req, res) => {
//     req.logout();
//     req.flash("success_msg", "You have logged out");
//     res.redirect("/user/login");
// });

module.exports = router;
