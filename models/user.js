var mongoose = require('mongoose');

userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is required."
    },
    gender: {
        type: String,
        enum: [
            'Male', 'Female', 'Others'
        ],
        required: 'Gender is Required'
    },
    email: {
        type: String,
        required: 'Email is required'
    },
    password: {
        type: String,
        required: 'Password is required'
    }
});

// Custom validation for email
userScehma.path('email').validate((val) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid E-mail Format.');
const User = mongoose.model('User',userScehma);
module.exports = User