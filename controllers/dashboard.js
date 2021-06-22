const express = require('express');
const router = express.Router();
const auth = require('../middlewares/checkSessionAuth');
const mongoose = require('mongoose');
var Product = mongoose.model('Product');
// Dashboard
router.get('/dashboard', auth ,function (req,res){
    res.render('dashboard',{
        user: req.session.user
    });
});
// Products
router.get('/products/add', auth ,function (req,res){
    res.render('products/add',{
        user: req.session.user
    });
});
// Products
router.post('/products/add', auth ,function (req,res){
    var product = new Product(req.body);
    product.save((err, doc) => {
        if (!err)
            return res.redirect("/products")
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body);
                res.render("products/add",req.body,{
                    user: req.session.user
                });
            }else if(err.name === "MongoError"){
                req.body['MongoError'] = err.name;
                res.render("signup",req.body)
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
});

router.get('/products', auth, (req,res) => {
    Product.find((err,doc) => {
        if (!err) {
            res.render("products/index",{
                list: doc
            })
        }else{
            console.log("error Fetching Records",err);
        }
    });
})

router.get("/products/:id/edit", auth, async (req,res) => {
    var product = await Product.findById(req.params.id);
    res.render("products/edit",product);
});

router.post('/products/:id', auth, (req,res) => {
    Product.findOneAndUpdate(req.params.id,req.body,(err,doc) => {
        if (!err) {
            res.redirect("/products");
        }else{
            console.log("error Fetching Records",err);
        }
    });
})

router.get("/products/:id/delete", auth, async (req,res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    res.redirect("/products");
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'description':
                body['descriptionError'] = err.errors[field].message;
                break;
            case 'price':
                body['priceError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;
