const passport = require("../controllers/passportController");
const express = require("express");
const { ModuleFilenameHelpers } = require("webpack");
const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] }),
  (req, res) => {
    console.log("inside first callback");
  }
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("inside the oauth callback");
    res.redirect("http://localhost:8080/homepage");
  }
);

module.exports = router;
