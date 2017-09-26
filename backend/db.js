const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

// User schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: {
            unique: true
        },
        lowercase: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    }
});

var User = mongoose.model("User", UserSchema);
module.exports = User;

module.exports.createUser = (newUser, callBack) => {
    newUser.password = bcrypt.hashSync(newUser.password, salt);
    newUser.save(callBack);
}

module.exports.getUserByUserName = (username, callBack) => {
    var query = {
        username: username
    };
    User.findOne(query, callBack);
}

module.exports.comparePassword = (candidatePassword, hash, callBack) => {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callBack(err, isMatch);
    });
}

module.exports.getUserByID = (id, callBack) => {
    User.findByID(id, callBack);
}
