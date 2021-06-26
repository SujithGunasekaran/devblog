const mongooes = require('mongoose');
const config = require('../config');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('./model/userModel');
require('./model/blogPostModel');
require('./model/tagsModel');
require('./model/userFollowModel');

exports.connect = () => {

    const { MONGO_URI } = config;

    mongooes.connect(`${MONGO_URI}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, () => {
            console.log("Mongodb connected Successfully");
        })

}

exports.initializeMongodbSession = () => {

    const { MONGO_URI } = config;

    const store = new MongoDBStore({
        uri: MONGO_URI,
        collection: 'devBlogSession'
    });

    return store;
}
