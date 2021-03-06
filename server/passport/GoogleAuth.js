const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../config');
const mongoose = require('mongoose');
const User = require('../mongodb/model/userModel');
const UserFollowModel = require('../mongodb/model/userFollowModel');

const dev = process.env.NODE_ENV !== 'production';

const { GOOGLE_CLIENTID, GOOGLE_CLIENTSECRET, LOCAL_CALLBACK_URL = 'http://localhost:3000/google/callback', PRODUCTION_CALLBACK_URL = '' } = config;

const callBackURL = dev ? LOCAL_CALLBACK_URL : PRODUCTION_CALLBACK_URL;

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})

passport.use(new GoogleStrategy({
    clientID: `${GOOGLE_CLIENTID}`,
    clientSecret: `${GOOGLE_CLIENTSECRET}`,
    callbackURL: `${callBackURL}`
},
    async (accessToken, refreshToken, profile, done) => {

        const { id, displayName, photos } = profile;

        try {
            const user = await User.findOne({ userid: id });
            if (user) done(null, user);
            if (!user) {
                const newUser = new User({ userid: id, username: displayName, userprofile: photos[0].value });
                const savedUser = await newUser.save();
                const newUserFollow = new UserFollowModel({ userid: mongoose.Types.ObjectId(savedUser._id) });
                await newUserFollow.save();
                done(null, savedUser);
            }
        }
        catch (err) {
            console.log(err);
            done(null, profile);
        }

    }
));
