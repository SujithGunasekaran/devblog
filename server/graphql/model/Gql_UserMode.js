

class userModel {

    constructor(model, req) {
        this.model = model;
        this.request = req;
    }

    getUser() {
        if (this.request.isAuthenticated()) {
            return this.request.user;
        }
        return null;
    }

    signOut() {
        try {
            this.request.logout();
            return true;
        }
        catch (err) {
            throw new Error('user not loggedin');
        }
    }

}

module.exports = userModel;
