var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var openingTimesSchema = new Schema({
  days : {type : String, required : true},
  open : String,
  close : String,
  closed : {type : Boolean, required : true}
});

var reviewSchema = new Schema({
  name : {type : String, required : true},
  date : {type : Date, "default" : Date.now},
  details : {type : String, required : true}
});

var locationSchema = new Schema({
  name : {type : String, required : true},
  address : {type : String, required : true},
  facilities : [String],
  coords : {type : [Number], index : "2dsphere"},
  openingTime : [openingTimesSchema],
  review : [reviewSchema]
});


module.exports = mongoose.model("Location", locationSchema);
