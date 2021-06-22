var mongoose = require('mongoose');

productScehma = new mongoose.Schema({
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
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product',productScehma);
module.exports = Product