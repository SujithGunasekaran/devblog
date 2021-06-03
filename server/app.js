const express = require('express');
const next = require('next');
const cors = require('cors');
const config = require('./config');
const passport = require('passport');
const cookieSession = require('cookie-session');

// graphql
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

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

    server.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [SESSION_SECRET]
    }));

    server.use(passport.session());

    // passport authentication

    server.get('/google', passport.authenticate('google', { scope: ["profile", "email"] }));

    server.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
        res.redirect('http://localhost:3000/');
    })

    server.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

    server.get('/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
        res.redirect('http://localhost:3000/');
    });


    // graphql server

    const schema = buildSchema(`

        type Query {
            hello : String
        }

    `);

    const root = {
        ...sampleResolver
    }

    server.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    }));

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, () => {
        console.log(`Server is running on PORT : ${PORT}`);
    })


})
