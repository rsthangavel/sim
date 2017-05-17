const express = require('express');
//var passport = require('passport');
var passportJwt = require('passport-jwt');
var passportlocal = require('passport-local'),
LocalStrategy = require('passport-local').Strategy;
var secret = require('./secret');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'test';
 module.exports = function(passport){
 
   var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = secret.secret;
     passport.use(new JwtStrategy(opts,
       //  {usernameField: req.body.token, passReqToCallback:true},
         function(jwt_payload, done){
             console.log('success');
        return done(null,true);

 }));
 }
var router = express.Router();