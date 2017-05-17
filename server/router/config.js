const express      = require('express');
var Joi            = require('joi');
var registerJoi    = require('../validation/register');
var loginJoi       = require('../validation/login');
var db             = require('../model/config');
var jwt            = require('jsonwebtoken');
var passport       = require('passport');
var secret         = require('./secret');
var userSchema     = require('../model/schema/user');
var transporter    = require('./mailservice');

require('../social/config')(passport);


//var loginSchema    = require('../model/schema/login');

require('./passport')(passport);
const router = express.Router();
router.use(passport.initialize());

//router
router.get('/', (req,res)=>{
    res.send('api working');
});

//user login router
router.post('/login',(req,res, next) =>{
    var loginvalue = { EmailId : req.body.EmailId, Password : req.body.Password};
     Joi.validate(loginvalue, loginJoi, function(err,value){
      if(!err){
          next();
      }
      else{
          return res.status(401).send({success: false, message: err})
      }  
   });
}, (req,res)=>{
         userSchema.findOne({EmailId : req.body.EmailId}, function(err,user){
    if(err){
                 res.status(500).send(err);
             }
    if(user){
        console.log(user);
        if(!user.Active){
               return res.status(200).send({success: false, message: 'Email Not yet Verified'});
        }
        else{
        console.log(user);
         user.comparePassword(req.body.Password , function(err, isMatch){
                if(err) throw err;
                if(isMatch)
                            {
                                var token = jwt.sign({id: user._id}, secret.secret, {
                                    expiresIn : 3600,
                                 });
                                 return res.send({success: true, token: token});
                            }
                            else{
                                  return res.status(401).send({success: false, message: 'Email or Password Wrong' });
                            }
         
    });
        }
                    
         }
    else
    {
        return res.status(401).send({success: false, message: 'Email or Password Wrong'});
    }
        
         });
   
});

//refresh token for page refresh
router.post('/refresh_token', function(req,res){
   
 jwt.verify(req.headers.authorization, secret.secret, function(err,decoded){
   
     if(!err){
            userSchema.findOne({EmailId : req.body.EmailId}, function(err,user){
            if(err){
                 res.status(500).send(err);
                }
             if(user){
      var token = jwt.sign({id: user._id}, secret.secret, {
             expiresIn : 2000,
         });
        
         res.status(200).send({success: true, token: token});
                    }
        
     });
     }
  
     else{
      
         return res.status(401).send({success:false, message: err});
     }
    });
     
      
});

//user register with joi validator act as middleware and store data using register schema 
router.post('/register',  (req,res,next)=>{
    //middleware
   var registervalue = {EmailId : req.body.EmailId, Gender : req.body.Gender, DOB: req.body.DOB, Password: req.body.Password};
   Joi.validate(registervalue, registerJoi, function(err,value){
      if(!err){
          next();
      }
      else{
          return res.status(401).send({success: false, message: err})
      }  
   });
   

}, (req,res)=> {
      var registervalue = {EmailId : req.body.EmailId, Gender : req.body.Gender, DOB: req.body.DOB, Password: req.body.Password};
    userSchema.findOne({EmailId : req.body.EmailId}, function(err,user){
    if(err){
                 res.status(500).send(err);
             }
    if(user){
        return res.status(200).send({success: false, message: 'Email Already Registered with us'});
    }
    else{
         //store user data
         var register = new userSchema(registervalue);
         register.save(function(err){
             if(err){
                 console.log(err);
                 return res.status(500).send(err);
             }
             else{
                    var token = jwt.sign({EmailId: req.body.EmailId},'mailSecret', {
                            expiresIn : 3600,
                             });
                   let mailOptions = 
                   {
                    from: '"SIMINTA 👻" <thangavel.asahi@gmail.com>', // sender address
                    to: req.body.EmailId, // list of receivers
                    subject: 'SIMINTA Account Verification ✔', // Subject line
                    text: 'Hello world ?', // plain text body
                    html: '<h1>Email Verification</h1><br /><a href="http://localhost:2000/api/token_verify/?token='+ token+'">Verify My Account</a>' // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        else{
                             return res.status(200).send({success:true, message: 'Please Verify Your Email Address'});
                        }
                     console.log('Message %s sent: %s', info.messageId, info.response);
                        });
             }
         });

    }
});
   
});
//token_verification

router.get('/token_verify', (req,res)=>{
   if(req.query.token)
   {
     jwt.verify(req.query.token, 'mailSecret', function(err,decoded)
     {
        
            if(!err)
            { 
                  console.log(decoded.EmailID);
                userSchema.findOne({EmailId : decoded.EmailId, Active: false}, function(err,user)
                {
                    
                    if(err)
                    {
                         
                        res.status(500).send(err);
                    }
                    if(user)
                    {
                    
                       userSchema.update({ EmailId : decoded.EmailId }, { Active : true}, function(err,user)
                       {
                          if(err){
                              return res.send(401);
                          }
                          if(user){
                               var token = jwt.sign({EmailId: req.body.EmailId}, secret.secret, 
                                    {
                                    expiresIn : 2000,
                                });
                                return res.redirect('http://localhost:4200/admin/token/'+token);
                                  // return res.status(200).send({success: true, token: token});
                              
                          }
                       })
                     }
                     else
                     {
                         res.status(200).send("Token Expired or Invalid");
                     }
                });
        //return res.status(200).send({success: false, message: 'Email Already Registered with us'});
            }
            else{
                res.status(200).status("Something Went Wrong");
            }
         
    });

  } 
  else
  { 
     return res.status(401);
  }
})
//return details
router.post('/get-details', passport.authenticate('jwt',{session:false}), (req,res)=>{
    res.end('success');
});

//google authenticate
router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

//facebook authenticate
router.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});

  //facebook callback
 router.get('/auth/facebook/callback',
 passport.authenticate('facebook', { failureRedirect: 'login' }),
  function(req, res) {
      var token = jwt.sign({id: req.user.id}, secret.secret, {
          expiresIn: 1440 // expires in 24 hours
        });
   return res.redirect('http://localhost:4200/admin/token/'+token);
  });

  //google callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'login' }),
  function(req, res) {
    console.log(req.user);
    var token = jwt.sign({id: req.user.id}, secret.secret, {
          expiresIn: 1440 // expires in 24 hours
        });
          //res.json({success:true, token: token, Role: req});
          //res.header('authorization',req.user.token);
        
    return res.redirect('http://localhost:4200/admin/token/'+token);
  });



module.exports =  router;