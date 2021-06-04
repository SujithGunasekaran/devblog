const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');
const User = require('../mongodb/model/userModel');

const { GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET } = config;

passport.serializeUser((user, done) => {
    console.log("sec", user);
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    console.log("id", id);
    User.findById({ id }, (err, user) => {
        done(err, user);
    })
})

passport.use(new GoogleStrategy({
    clientID: `${GOOGLE_CLIENTID}`,
    clientSecret: `${GOOGLE_CLIENTSECRET}`,
    callbackURL: "http://localhost:3000/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {

        const { id, displayName, photos } = profile;

        try {
            const user = await User.findOne({ userid: id });
            if (user) done(null, user);
            if (!user) {
                const newUser = new User({ userid: id, username: displayName, userprofile: photos[0].value });
                const savedUser = await newUser.save();
                done(null, savedUser);
            }
        }
        catch (err) {
            console.log(err);
            done(null, profile);
        }

    }
));
