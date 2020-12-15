const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.use(new GoogleStrategy({
    clientID: "1021045324608-gr7ao84frl5bk4iflnrt32oaos6cu9pt.apps.googleusercontent.com",
    clientSecret: "6OCltFQtdJjbNkluJmEOHjJZ",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (token, tokenSecret, profile, done) {
        console.log("inside the passport controller")
        return done(null, profile)
    }
));

module.exports = passport