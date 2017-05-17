var Joi = require('joi');
//schema for register routes
const schema = Joi.object().keys({
 
    EmailId     : Joi.string().email().required(),
    Gender      : Joi.string().required(),
    Password    : Joi.string().regex(/[a-zA-z0-9]{3,30}/).required(),
    DOB         : Joi.string().required(),
   
})
module.exports = schema