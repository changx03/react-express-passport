var express = require("express");
var {
    check,
    validationResult
} = require("express-validator/check");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log("Path: ", req.path, "Time: ", Date.now());
    next();
});

// req.path in miniapp does not contain entry
router.post("/", [
    check("name").exists(),
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
    var name = req.body.name,
        email = req.body.email,
        password = req.body.password;

    console.log(name, email, password);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.mapped()
        });
    }
    res.redirect("/welcome");
});

module.exports = router;
