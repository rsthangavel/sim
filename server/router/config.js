const express = require('express');
var db = require('../model/config');
var jwt = require('jsonwebtoken');
var passport = require('passport');
require('./passport')(passport);
const router = express.Router();


//router
router.get('/', (req,res)=>{
    res.send('working');
});


router.post('/login', (req,res)=>{
    console.log(req);
    if(req.body.EmailId && req.body.Password){
         var token = jwt.sign({EmailId: req.body.EmailId}, 'test',{
             expiresIn: 144,
             issuer : 'HS128'
         });
         res.end(token);
    }
    else{
        res.end('failed');
    }
});

router.post('/register', passport.authenticate('jwt',{session:false}), (req,res)=>{

});
router.post('/get-details', passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.end('success');
})


module.exports =  router;