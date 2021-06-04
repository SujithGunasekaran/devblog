const passport = require('passport');

exports.sampleResolver = {

    hello: () => {
        return "Welcome to graphql";
    },
    login: (args, context) => {
        return {
            userid: 'asdasd',
            username: "asdasd",
            userprofile: "asdasd"
        }
    }

}
