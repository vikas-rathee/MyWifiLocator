require('dotenv').load();
var express = require("express");
var routesApi = require("./app_api/routes/route");
var path = require("path");
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require("passport");
var fs = require("fs");
var uglifyJS = require("uglify-js");

require("./app_api/models/db");
require("./app_api/config/passport");

var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: true }))
   .use(express.static(path.join(__dirname, "/public")))
   .use(express.static(path.join(__dirname, "/app_client")))
   .use(passport.initialize())
   .use("/api", routesApi)
   .use(function(err, req, res, next){
     if(err.name === "UnauthorizedError"){
       res.status(401);
       res.json({message : err.name + ":" + err.message});
     }
     next();
   })
   .use("/", function(req,res){
     res.sendFile(path.join(__dirname,"/index.html"));
   })
   .listen(process.env.PORT || 2000);
console.log("Listening to port $PORT || 2000");

console.log(process.env.NODE_ENV);
