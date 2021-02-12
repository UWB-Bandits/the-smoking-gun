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
    firebase_uid: {
        type: String,
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: "Book"
        }
    ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
