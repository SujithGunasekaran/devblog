const dotenv = require('dotenv');

dotenv.config();

const configData = {
    PORT: process.env.PORT,
    GOOGLE_CLIENTID: process.env.GOOGLE_CLIENTID,
    GOOGLE_CLIENTSECRET: process.env.GOOGLE_CLIENTSECRET,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    LOCAL_URL: process.env.LOCAL_URL,
    PRODUCTION_URL: process.env.PRODUCTION_URL,
    LOCAL_CALLBACK_URL: process.env.LOCAL_CALLBACK_URL,
    PRODUCTION_CALLBACK_URL: process.env.PRODUCTION_CALLBACK_URL
}

module.exports = configData;
