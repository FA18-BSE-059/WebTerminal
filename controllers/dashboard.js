const express = require('express');
const router = express.Router();

// Dashboard
router.get('/dashboard',function (req,res){
    res.render('dashboard');
});

module.exports = router;
