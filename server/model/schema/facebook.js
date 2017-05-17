const mongoose   = require('mongoose');

//schema for simcollection
var registerSchema = mongoose.Schema
({
    facebook   :  {
        facebookID  : {},
        Name      : {},
    }
});

//hash password before save to db


//check password 

module.exports = mongoose.model('socialFacebook', registerSchema, 'register');