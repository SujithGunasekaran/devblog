const express = require('express');
const next = require('next');
const cors = require('cors');
const config = require('./config');
const passport = require('passport');

require('./passport/GoogleAuth');
require('./passport/GithubAuth');

const { PORT } = config;

const port = PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log("port", PORT);

app.prepare().then(() => {

    const server = express();

    server.use(cors());
    server.use(passport.initialize());

    server.get('/google', passport.authenticate('google', { scope: ["profile", "email"] }));

    server.get('/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
        res.redirect('http://localhost:3000/');
    })

    server.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

    server.get('/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }), (req, res) => {
        res.redirect('http://localhost:3000/');
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    })

    server.listen(port, () => {
        console.log(`Server is running on PORT : ${PORT}`);
    })


})
