var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

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
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser, salt, (err, hash) => {
            // Store hash in your password DB. 
            newUser.password = hash;
            newUser.save(callBack);
        });
    });
}

module.exports.getUserByUsername = (username, callBack) => {
    var query = {
        username: username
    };
    User.findOne(query, callBack);
}

module.exports.getUserByID = (id, callBack) => {
    User.findByID(id, callBack);
}

module.exports.comparePassword = (candidatePassword, hash, callBack) => {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callBack(null, isMatch);
    });
}
