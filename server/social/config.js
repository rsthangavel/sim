var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var db = require('../model/config.js');
module.exports = function(passport){
       passport.serializeUser(function(user, done) {
           //console.log(user);
        done(null, user.id);
    });
 passport.deserializeUser(function(id, done) {
        student.findById(id, function(err, user) {
            done(err, user);
        });
    });
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
    
            // try to find the user based on their google id
            student.findOne({ googleID : profile.id }, function(err, user) {
                 
                if (err)
                
               // console.log(err);
                   return done(null,err);

                if (user) {
                     
                    // if a user is found, log them in
                    return done(null, user);
                } else {
                      //console.log(profile.displayName);
                      var test = Math.floor(Math.random()*100)+1;
                      //console.log(test);
                     var user = {studentID: test,googleID: profile.id, token: token, studentName: profile.displayName, email:profile.emails[0].value}
                    // if the user isnt in our database, create a new user
                    var newUser          = new student(user);

                    // set all of the relevant information
                    //newUser.googleID    = profile.id;
                    //newUser.token = token;
                    //newUser.studentName  = profile.displayName;
                    //newUser.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if(err){
                            console.log(err);
                        }
                         //console.log(profile.id);
                      
                        return done(null, newUser);
                    });
                }
            }); 
        });

    }));
    passport.use(new FacebookStrategy({
          clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done){
        console.log(profile.id);
        student.findOne({facebookID : profile.id},function(err,user){
            if(err){
                console.log(err);
            }
            if(!err && user !== null){
                done(null,user);
            }
            else{
                  var test = Math.floor(Math.random()*100)+1;
                      //console.log(test);
                     var user = {studentID: test,facebookID: profile.id, studentName: profile.displayName}
                    // if the user isnt in our database, create a new user
                    var newUser          = new student(user);
                       newUser.save(function(err) {
                        if(err){
                            console.log(err);
                        }
                         //console.log(profile.id);                    
                        return done(null, newUser);   
            });
        }
    })
}
))};
