const passport = require("../controllers/passportController")
const express = require("express");
const { ModuleFilenameHelpers } = require("webpack");
const router = express.Router()

router.get('/',
    passport.authenticate('google', { scope: ["profile", "email"] }),
    (req, res) => {
        console.log('inside first callback')
    }
)

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('inside the oauth callback')
        res.redirect('https://www.youtube.com/watch?v=oBt53YbR9Kk');
    });


module.exports = router