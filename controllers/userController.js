const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

// All Data
router.get('/',function (req,res){
    Faculty.find((err,doc) => {
        if (!err) {
            res.render('faculty/index',{
                list: doc
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    })
});

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
            return res.redirect("/dashboard")
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
router.post('/login',function (req,res){
    User.find({email: req.body.email, password: req.body.password},'email password', (err, doc) => {
        if(!err){
            // res.redirect("/dashboard");
            console.log(err)
        }else{
            console.log(err);
        }
    })
});

// Show Update Form
router.get('/:id/edit',function (req, res) {
    Faculty.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("faculty/update", doc);
        }
    });
});

// Update Record
router.put('/:id',function (req, res) {
    Faculty.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/faculty'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
});
// Remove Record
router.get('/delete/:id',function (req, res) {
    Faculty.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/faculty');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});
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
