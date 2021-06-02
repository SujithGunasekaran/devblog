const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');

const { GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET } = config;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: `${GOOGLE_CLIENTID}`,
    clientSecret: `${GOOGLE_CLIENTSECRET}`,
    callbackURL: "http://localhost:3000/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        cb(null, profile);
    }
));
