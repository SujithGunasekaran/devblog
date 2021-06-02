const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('../config');

const { GITHUB_CLIENTID, GITHUB_CLIENTSECRET } = config;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})


passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENTID,
    clientSecret: GITHUB_CLIENTSECRET,
    callbackURL: "http://localhost:3000/github/callback"
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        done(null, profile);
    }
));
