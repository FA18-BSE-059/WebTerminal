const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Faculty = mongoose.model("User");

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

// Store Value
router.post('/',function (req,res){
    var faculty = new Faculty();
    faculty.name = req.body.name
    faculty.email = req.body.email;
    faculty.address = {
        street_address: req.body.street_address,
        city: req.body.city,
        country: req.body.country
    };
    faculty.gender = req.body.gender;
    faculty.course_code = req.body.course_code;
    faculty.city = req.body.city;
    faculty.country = req.body.country;
    faculty.phone_numbers = req.body.phone;
    faculty.save((err, doc) => {
        if (!err)
            return res.redirect("/faculty")
        else {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body);
                res.render("faculty/create",req.body)
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });

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
            case 'street_address':
                body['streetAddressError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            case 'country':
                body['countryError'] = err.errors[field].message;
                break;
            case 'course_code':
                body['courseCodeError'] = err.errors[field].message;
                break;
            case 'phone':
                body['phoneError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
module.exports = router;
