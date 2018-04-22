var mongoose = require("mongoose");
var User = require("../models/users");
var passport = require("passport");

module.exports.register = function(req, res){
  if(!req.body.name || !req.body.email || !req.body.password)
  {
    sendJSONResponse(res, 400, {message : "All fields are required"});
    return;
  }

  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.salt = user.generateSalt();
  user.hash = user.generateHash(req.body.password);

  user.save(function(err, user){
    if(err){
      sendJSONResponse(res, 400, err);
    } else {
      // var token = user.generateJwt();
      console.log(user);
      // console.log(token);
      sendJSONResponse(res, 200, {message : "Registered Successfully"});
    }
  });
};

module.exports.login = function(req, res){
  if(!req.body.email || !req.body.password){
    sendJSONResponse(res, 400, {message : "All fields are required"});
    return;
  }

  passport.authenticate("local", function(err, user, info){
    if(err){
      sendJSONResponse(res, 404, err);
      return;
    }

    if(user){
      var token = user.generateJwt();
      sendJSONResponse(res, 200, {token : token});
    } else {
      sendJSONResponse(res, 401, info);
    }
  })(req,res);
};

var sendJSONResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};
