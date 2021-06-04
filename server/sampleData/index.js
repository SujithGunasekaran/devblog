const mongoose = require('mongoose');
const dataInfo = require('./DataInfo');
const User = require('../mongodb/model/userModel');
const config = require('../config');

const { MONGO_URI } = config;

const { userInfo } = dataInfo;

mongoose.connect(`${MONGO_URI}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, async () => {
        console.log("populating data in DB....");
        await User.deleteMany({});
        await User.create(userInfo);
        console.log("SampleData populated successfully..");
    })


