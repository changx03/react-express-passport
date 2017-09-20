var express = require("express");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Path: ", req.path, "Time: ", Date.now());
  next();
});

// req.path in miniapp does not contain entry
router.post("/", (req, res) => {
  var name = req.body.name,
    email = req.body.email,
    password = req.body.password;

  console.log(name, email, password);
  // res.json({
  //   message: "signup success",
  //   name: name
  // });
  res.redirect("/welcome");
});

module.exports = router;
