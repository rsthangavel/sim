const mongoose   = require('mongoose');
var bcrypt       = require('bcrypt');
SALT_WORK_FACTOR = 10;

//schema for simcollection
var registerSchema = mongoose.Schema
({
    EmailId  :  { type:String,  index: {unique:true }},
    Gender   :  { type:String },
    DOB      :  { type:String },
    Password :  { type:String },
    Active   :  { type:Boolean, default:0 },
    google   :  {
        googleID  : {},
        Name      : {},
        image     : {},
        emails    : {}
    },    
    facebookID : { default:0 },
    twitter  :   { default:0 }
});

//hash password before save to db
registerSchema.pre('save', function(next)
{
   var user = this;
   bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt)
   {
       if(err) return next(err);

       bcrypt.hash(user.Password, salt, function(err, hash)
       {
           if(err) return next(err);
           user.Password = hash;
           next();
       })
   })
});

//check password 
registerSchema.methods.comparePassword = function(Password, cb){
   bcrypt.compare(Password, this.Password, function(err, isMatch){
       if(err) return next(err);
       cb(null, isMatch);
   })
}

module.exports = mongoose.model('user', registerSchema, 'register');