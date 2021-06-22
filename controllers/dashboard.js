const express = require('express');
const router = express.Router();
const auth = require('../middlewares/checkSessionAuth')
// Dashboard
router.get('/dashboard', auth ,function (req,res){
    res.render('dashboard',{
        user: req.session.user
    });
});
// Products
router.get('/dashboard', auth ,function (req,res){
    res.render('dashboard',{
        user: req.session.user
    });
});

module.exports = router;
