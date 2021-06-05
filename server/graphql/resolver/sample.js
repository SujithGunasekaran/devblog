const passport = require('passport');

exports.sampleResolver = {

    hello: () => {
        return "Welcome to graphql";
    },
    login: async (args, context) => {
        const { isAuthenticated, user } = context;
        return {
            userid: 'asdasd',
            username: "asdasd",
            userprofile: "asdasd"
        }
    }

}
