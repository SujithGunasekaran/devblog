const config = require('../config');
const session = require('express-session');
const { initializeMongodbSession } = require('../mongodb');

exports.initMiddleWare = (server) => {

    const { SESSION_SECRET } = config;

    const sessionInfo = {
        name: 'devBlogSession',
        secret: SESSION_SECRET,
        cookie: { maxAge: 2 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
        store: initializeMongodbSession()
    };

    if (process.env.NODE_ENV === 'production') {
        server.set('trust proxy', 1);
        sessionInfo.cookie.secure = true;
        sessionInfo.cookie.httpOnly = true;
        sessionInfo.cookie.sameSite = 'none';
    }

    server.use(session(sessionInfo));

}
