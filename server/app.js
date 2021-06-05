const express = require('express');
const next = require('next');
const cors = require('cors');
const config = require('./config');
const passport = require('passport');

// graphql
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// graphql types
const { userTypes } = require('./graphql/types/userTypes');

// grapql resolver
const { sampleResolver } = require('./graphql/resolver/sample');

require('./passport/GoogleAuth');

const { PORT } = config;

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

    require('./middleware').initMiddleWare(server);

    // initialize passport
    server.use(passport.initialize());
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

    server.use('/graphql', graphqlHTTP((req) => {
        return {
            schema,
            rootValue: root,
            graphiql: true,
            context: {
                isAuthenticated: () => req.isAuthenticated(),
                logout: () => req.logout(),
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
