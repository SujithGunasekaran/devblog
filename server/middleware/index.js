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

    server.use(session(sessionInfo));

}
