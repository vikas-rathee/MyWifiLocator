var mongoose = require("mongoose");
var User = require("../models/users.js");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


passport.use(new LocalStrategy({
  usernameField : "email"
},function(username, password, done){
  User.findOne({email : username}, function(err, user){   //this function is the verify callback
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false,{message : "No User Found"});
    }

    if(!user.validatePassword(password)){
      return done(null, false, {message : "Wrong Password"});
    }

    return done(null, user);
  });
}));
