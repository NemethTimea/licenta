const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        require: true,
        validate: [isEmail, "invalid email address"],
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 4,
        maxlength: 12
    },
    about: {
        type: String,
        required: true,
        trim: true
    },
    printer: {
        type: Boolean
    },
    follows: {
        type: Number
    },
    followers: {
        type: Array
    },
    favourites: {
        type: Array
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;