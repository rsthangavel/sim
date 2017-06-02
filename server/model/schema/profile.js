const mongoose   = require('mongoose');

//schema for simcollection
var registerSchema = mongoose.Schema
({
   profile_details : {
            link_id      : {},
             header_image : {
                 fieldname : {},
                 originalname : {},
                 encoding : {},
                 mimetype :{},
                destination      : {},
                 filename : {},
                path : {},
                 size     : {}
             },
             profile_image : {
                 fieldname : {},
                 originalname : {},
                 encoding : {},
                 mimetype :{},
                destination      : {},
                 filename : {},
                path : {},
                 size     : {}
             },
             profile_info : {
                 first_name : {},
                 last_name  : {},
                 mobile     : {},
                 address    : {},
             }
     }

});

//hash password before save to db


//check password 

module.exports = mongoose.model('profile', registerSchema, 'profile');