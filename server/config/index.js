const dotenv = require('dotenv');

dotenv.config();

const configData = {
    PORT: process.env.PORT,
    GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
    GOOGLE_CLIENTSECRET: process.env.GOOGLE_CLIENTSECRET,
    GITHUB_CLIENTID: process.env.GITHUB_CLIENTID,
    GITHUB_CLIENTSECRET: process.env.GITHUB_CLIENTSECRET,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET
}

module.exports = configData;
