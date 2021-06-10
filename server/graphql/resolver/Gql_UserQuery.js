const passport = require('passport');

exports.userQuery = {

    getUserInfo: (root, args, context) => {
        const userInfo = context.model.userModel.getUser();
        return userInfo;
    },
    logout: (root, args, context) => {
        const message = context.model.userModel.signOut();
        return message;
    }

}
