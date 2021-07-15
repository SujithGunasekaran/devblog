const express = require('express');
const next = require('next');
const cors = require('cors');
const config = require('./config');
const passport = require('passport');

require('./passport/GoogleAuth');

const { PORT } = config;

const port = process.env.PORT || PORT;
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

    server.get('/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.PRODUCTION_URL}login` }), (req, res) => {
        res.redirect(`${process.env.PRODUCTION_URL}`);
    })

    const apolloServer = require('./graphql').createApolloServer();
    apolloServer.applyMiddleware({
        app: server,
        cors: { credentials: true, origin: `${process.env.PRODUCTION_URL}` }
    })

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, () => {
        console.log(`Server is running on PORT : ${port}`);
    })


})
