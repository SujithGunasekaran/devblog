const express = require('express');
const next = require('next');
const cors = require('cors');
const config = require('./config');
const passport = require('passport');
// const cookieSession = require('cookie-session');
const session = require('express-session');

// graphql
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// graphql types
const { userTypes } = require('./graphql/types/userTypes');

// grapql resolver
const { sampleResolver } = require('./graphql/resolver/sample');

require('./passport/GoogleAuth');
require('./passport/GithubAuth');

const { PORT, SESSION_SECRET } = config;

const port = PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// mongodb connection
const mongodb = require('./mongodb')
mongodb.connect();


app.prepare().then(() => {

    const server = express();

    server.use(cors());
    server.use(passport.initialize());

    // require('./middleware').initMiddleWare(server);

    // server.use(cookieSession({
    //     maxAge: 24 * 60 * 60 * 1000,
    //     keys: [SESSION_SECRET]
    // }));

    const sessionInfo = {
        secret: SESSION_SECRET,
        cookie: { maxAge: 2 * 60 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
    };

    server.use(session(sessionInfo))

    // initialize passport

    server.use(passport.session());


    // passport authentication

    server.get('/google', passport.authenticate('google', { scope: ["profile", "email"] }));

    server.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
        res.redirect('http://localhost:3000/');
    })


    // graphql server

    const schema = buildSchema(`

        ${userTypes}

        type Query {
            hello : String
            login : getUser
        }

    `);

    const root = {
        ...sampleResolver
    }

    server.use('/graphql', graphqlHTTP((req, res, graphQLParams) => {
        return {
            schema,
            rootValue: root,
            graphiql: true,
            context: {
                user: req.user
            }
        }
    }));

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, () => {
        console.log(`Server is running on PORT : ${PORT}`);
    })


})
