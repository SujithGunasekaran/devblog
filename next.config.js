
const dev = process.env.NODE_ENV !== 'production';

module.exports = {
    env: {
        BASE_URL: dev ? 'http://localhost:3000/graphql' : 'https://devsblog.herokuapp.com/graphql'
    }
}
