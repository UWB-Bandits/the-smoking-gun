const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profilePic: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;