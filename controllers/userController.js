const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
// Create Form
router.get('/signup',function (req,res){
    return res.render("signup");
});
// Create Form
router.get('/login',function (req,res){
    return res.render("login");
});

// Signup Value
router.post('/signup',function (req,res){
    var user = new User();
    user.name = req.body.name
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            return res.redirect("/login")
        else {
            console.log(err.name)
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body);
                res.render("signup",req.body)
            }else if(err.name === "MongoError"){
                req.body['MongoError'] = err.name;
                res.render("signup",req.body)
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });

});

// Store Value
router.post('/login',async function (req,res){
    let user = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });
    if(user){
        req.session.user = user;
        res.redirect("/dashboard");
    }else{
        req.body['emailError'] = "Invalid Username/Password";
        res.render('login');
    }
});
router.get('/logout',(req, res) => {
    req.session.user = null;
    res.redirect("/logout")
})
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'gender':
                body['genderError'] = err.errors[field].message;
                break;
            case 'password':
                body['passwordError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;
