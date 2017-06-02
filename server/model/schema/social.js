const mongoose   = require('mongoose');

//schema for simcollection
var registerSchema = mongoose.Schema
({
    google   :  {
        googleID  : {},
        Name      : {},
        token     : {},
       // image     : {},
        email    : {}
    }
});

//hash password before save to db


//check password 

module.exports = mongoose.model('social', registerSchema, 'register');