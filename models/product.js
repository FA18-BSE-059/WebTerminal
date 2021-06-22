var mongoose = require('mongoose');

module.exports =  mongoose.model('Product',new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    rating: {
        type: String
    }
}));