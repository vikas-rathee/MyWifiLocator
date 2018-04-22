var mongoose = require("mongoose");
var readLine = require ("readline");
var Location = require("./locations");
var dbName = "wifidb";
var dbi = "mongodb://localhost/wifidb";
 if(process.env.NODE_ENV === "production"){
   dbi = "mongodb://VikasRathee:7991%40mLab@ds221609.mlab.com:21609/wifidb";

 }

mongoose.Promise = global.Promise;
mongoose.connect(dbi);


if (process.platform === "win32"){
  var rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ("SIGINT", function (){
    process.emit ("SIGINT");
  });
};

var manualShutdown = function(msg, callback){
  mongoose.connection.close(function(){
    console.log("Connection closed with message " + msg);
    callback();
  });
};

process.once('SIGUSR2', function () {
  manualShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function () {
  manualShutdown('app termination', function () {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  manualShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});


mongoose.connection.on("connected", function(){
  console.log("Connectod to database " + dbi);
});
mongoose.connection.on("error", function(err){
  console.log(err);
});
mongoose.connection.on("disconnected", function(){
  console.log("Disconnected from the database " + dbName)
});
