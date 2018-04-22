require("dotenv").load();
var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");

var userSchema = new Schema({
  name : {type : String, required : true},
  email : {type : String, required : true, unique : true},
  salt : {type : String},
  hash : String
});

userSchema.methods.generateSalt = function(){
  return crypto.randomBytes(16).toString("hex");
};

userSchema.methods.generateHash = function(password){
  return crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha512").toString("hex");
};

userSchema.methods.validatePassword = function(password){
    var hash;
    hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, "sha512").toString("hex");
    return this.hash === hash;
};

userSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // setting expiry date to 7 days

  return jwt.sign({
    _id : this._id,
    name : this.name,
    email : this.email,
    exp : parseInt(expiry.getTime() / 1000),  // converting miilisec to sec
  },process.env.JWT_SECRET);
};

module.exports = mongoose.model("User", userSchema);
