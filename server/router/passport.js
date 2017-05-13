const express = require('express');
var passport = require('passport');
var passportJwt = require('passport-jwt');
 var ExtractJwt = passportJwt.ExtractJwt;
 var JwtStrategy = passportJwt.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'tasmanianDevil';
 module.exports = function(passport){
       console.log(jwtOptions);
     passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next){
        return done(null,true);

 }));
 }
var router = express.Router();