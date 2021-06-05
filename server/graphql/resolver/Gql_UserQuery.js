const passport = require('passport');

exports.userQuery = {

    getUserInfo: (args, context) => {
        const userInfo = context.model.userModel.getUser();
        console.log(userInfo);
        return userInfo;
    },
    logout: (args, context) => {
        const message = context.model.userModel.signOut();
        return message;
    }

}
