const express      = require('express');
var multer      = require('multer');
var Joi            = require('joi'); 
var upload   = multer({dest:  '/home/thangavel/Desktop/sim/uploads/'});
var jwt            = require('jsonwebtoken');
var secret         = require('./secret'); 
var userSchema     = require('../model/schema/user'); //User model
var  uuid          = require('uuid/v1');
const router = express.Router();
var CryptoJS       = require('crypto-js');
var profileschema  = require('../model/schema/profile');

router.post('/image-upload-header', upload.single('uploadFile'), function(req,res,next){
  
 if(req.headers.authorization){
     
    jwt.verify(req.headers.authorization, secret.secret, function(err,decoded){
     if(!err){
      userSchema.findOne({_id : decoded.id}, function(err,user){
            if(err){
                 res.status(500).send(err);
                }
             if(user){
                profileschema.findOne({'profile_details.link_id': user.id}, function(err,user){
                   
              if(err){
                  res.status(500).send(err);
              }
              else if(user){
                 user.profile_details.header_image = req.file;
               
                 /*var fileDetails = { 'profile_details.header_image.filename' : req.file.filename,                    'profile_details.header_image.path': req.file.destination, 
                  'profile_details.header_image.size': req.file.size }; */
                  //var fileDetails = { 'profile_details' : { 'header_image' : {'filename' : req.file.filename }}};                console.log(fileDetails);
                  profileschema.update({'_id': user.id}, user, function(err,user1){
                      if(user1){
                            console.log(user1);
                           res.status(200).send({success:"true", message:"Header Image saved successfully"});
                      }
                      else{
                          res.status(200).send({message:"false"});
                      }
                  });
              }
              else{
                 
                    var storevalue = {'profile_details.link_id': decoded.id, 'profile_details.header_image.filename' : req.file.filename, 'profile_details.header_image.path': req.file.destination,  'profile_details.header_image.size': req.file.size };
                    var header = new profileschema(storevalue);
                    header.save(function(err, user){
             if(err){
                 console.log(err);
                // return res.status(500).send(err);
             }
             else{
                 res.status(200).send({success:"true", message:"Header Image saved successfully"});
             }
     });
              }
           }); 
    }
  });
     }
     else{
         return res.status(401).send({success:false, message: err});
     }
    });
 }
});

router.post('/image-upload-profile', upload.single('uploadFile'), function(req,res,next){
  
 if(req.headers.authorization){
     
    jwt.verify(req.headers.authorization, secret.secret, function(err,decoded){
     if(!err){
      userSchema.findOne({_id : decoded.id}, function(err,user){
            if(err){
                 res.status(500).send(err);
                }
             if(user){
                profileschema.findOne({'profile_details.link_id': user.id}, function(err,user){
                   
              if(err){
                  res.status(500).send(err);
              }
              else if(user){
                 user.profile_details.profile_image = req.file;
                 console.log(user);
                 /*var fileDetails = { 'profile_details.header_image.filename' : req.file.filename,                    'profile_details.header_image.path': req.file.destination, 
                  'profile_details.header_image.size': req.file.size }; */
                  //var fileDetails = { 'profile_details' : { 'header_image' : {'filename' : req.file.filename }}};                console.log(fileDetails);
                  profileschema.update({'_id': user.id}, user, function(err,user1){
                      if(user1){
                            console.log(user1);
                          res.status(200).send({success:"true", message:"Profile Image saved successfully"});
                      }
                      else{
                          res.status(200).send({message:"false"});
                      }
                  });
              }
              else{
                 
                    //var storevalue = {'profile_details.link_id': decoded.id, 'profile_details.header_image.filename' : req.file.filename, 'profile_details.header_image.path': req.file.destination,  'profile_details.header_image.size': req.file.size };
                    var header = new profileschema(req.file);
                    header.save(function(err, user){
             if(err){
                 console.log(err);
                // return res.status(500).send(err);
             }
             else{
                  res.status(200).send({success:"true", message:"Profile Image saved successfully"});
             }
     });
              }
           }); 
    }
  });
     }
     else{
         return res.status(401).send({success:false, message: err});
     }
    });
 }
});
router.post('/profile_info',  function(req,res,next){
   console.log(req.body);
 if(req.headers.authorization){
     
    jwt.verify(req.headers.authorization, secret.secret, function(err,decoded){
     if(!err){
      userSchema.findOne({_id : decoded.id}, function(err,user){
            if(err){
                 res.status(500).send(err);
                }
             if(user){
                profileschema.findOne({'profile_details.link_id': user.id}, function(err,user){
                   
              if(err){
                  res.status(500).send(err);
              }
              else if(user){
                    
                 user.profile_details.profile_info = req.body;
              
                 /*var fileDetails = { 'profile_details.header_image.filename' : req.file.filename,                    'profile_details.header_image.path': req.file.destination, 
                  'profile_details.header_image.size': req.file.size }; */
                  //var fileDetails = { 'profile_details' : { 'header_image' : {'filename' : req.file.filename }}};                console.log(fileDetails);
                  profileschema.update({'_id': user.id}, user, function(err,user){
                      if(user){
                            console.log(user);
                          res.status(200).send({success:"true", message:"Data Saved Successfully"});
                      }
                      else{
                          res.status(200).send({success:"false", message:"Error"});
                      }
                  });
              }
              else{
                 
                    //var storevalue = {'profile_details.link_id': decoded.id, 'profile_details.header_image.filename' : req.file.filename, 'profile_details.header_image.path': req.file.destination,  'profile_details.header_image.size': req.file.size };
                    var header = new profileschema(req.file);
                    header.save(function(err, user){
             if(err){
                 console.log(err);
                // return res.status(500).send(err);
             }
             else{
                  return res.status(200).send({success:"true", message:"Data Saved Succesfully"});
             }
     });
              }
           }); 
    }
  });
     }
     else{
         return res.status(401).send({success:false, message: err});
     }
    });
 }
});

router.post('/get-profile',(req,res)=>{
    if(req.headers.authorization){
           jwt.verify(req.headers.authorization, secret.secret, function(err,decoded){
               if(!err){
                     userSchema.findOne({_id : decoded.id}, function(err,user){
            if(err){
                 res.status(500).send(err);
                }
             if(user){
                profileschema.findOne({'profile_details.link_id': user.id}, function(err,user){
                   
              if(err){
                  res.status(500).send(err);
              }
              else if(user){
                  res.status(200).send({success:"true", message:user});
              }
              else{
                   res.status(200).send({success:"false", message: "Data not found"});
              }
                });
               }
               else{

               }
                     });
               }

               else{

               }
                     
           });
    }
    else{
  return res.status(401).send({success:false, message: err});
    }
});
module.exports = router;