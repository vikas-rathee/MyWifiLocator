var mongoose = require("mongoose");
var Loc = require("../models/locations");
var User = require("../models/users");




module.exports.reviewsReadOne = function(req, res){
  if(req.params && req.params.locationid && req.params.reviewid){  // Check locationid and reviewid in the request
    Loc.findById(req.params.locationid)
            .exec(function(err, locationData){
              if(!locationData){    // Check locationid is correct
                sendJSONResponse(res, 404, {
                  "message" : "No location found with matching id"
                });
                return;
              } else if(err){
                sendJSONResponse(res, 404, res); // Check any other errors
                return;
              }

              if(locationData.review && locationData.review.length > 0){ // Check if reviews of location exist
                var review = locationData.review.id(req.params.reviewid);
                if(!review){ // Check if reviewid is correct
                  sendJSONResponse(res, 404, {
                    "message" : "No review with matching id"
                  });
                } else { // Send the response with the review
                  var response = { location : {name : locationData.name, id : req.params.locationid},
                                   review : review
                                 };
                  sendJSONResponse(res, 200, response);
                }

              } else {
                sendJSONResponse(res, 404, {
                  "message" : "No Reviews Found"
                });
              }


            });



  } else {
    sendJSONResponse(res, 404, {
      "message" : "locationid and reviewid are required"
    });
  }
};

module.exports.reviewsCreate = function(req, res){
  var getUserName = function(req, res, callback){
  //  console.log(req);
    if(req.payload && req.payload.email){
      User.findOne({email : req.payload.email}, function(err, user){
        if(!user){
          sendJSONResponse(res, 404, {message : "User not found"});
          return;
        } else if(err){
          console.log(err);
          sendJSONResponse(res, 404, err);
          return;
        }
        callback(req, res, user.name);
      }) // end of findOne function
    } else {
       sendJSONResponse(res, 404, {message : "User not found"});
    }
  };

  getUserName(req ,res, function(req, res, username){
    if(req.params.locationid){
      Loc.findById(req.params.locationid)
         .select("review")
         .exec(function(err, locationData){
           if(err){
             sendJSONResponse(res, 404, err);
           } else {
             addReview(locationData, username);
           }
         });

    } else {
      sendJSONResponse(res, 404, {message : "locationid is required"});
    }
  }) // end of getUserName function

  var addReview = function(locationData, username){
    locationData.review.push({
      name : username,
      details : req.body.details
    });

    locationData.save(function(err, locationData){
      if(err){
        sendJSONResponse(res, 400, err);
      } else {
        var theReview = locationData.review[locationData.review.length-1];
        sendJSONResponse(res, 200, theReview);
      }
    });
  };

};

module.exports.reviewsUpdateOne = function(req, res){
  if(req.params.locationid && req.params.reviewid){
    Loc.findById(req.params.locationid)
       .select("review")
       .exec(function(err, locationData){
         if(!locationData) {
           sendJSONResponse(res, 404, {message : "No Location found with the matching id"});
         } else if(err){
           sendJSONResponse(res, 404, err);
         } else {
           if(locationData.review && locationData.review.length > 0){
             var thisReview = locationData.review.id(req.params.reviewid);
             if(req.body.name)
              thisReview.name = req.body.name;
             if(req.body.name)
              thisReview.details = req.body.details;
            locationData.save(function(err, locationData){
              if(err){
                sendJSONResponse(res, 404, err);
              } else {
                sendJSONResponse(res, 200, {message : "Successfully Updated the Review", review : thisReview});
              }
            });

           } else {
             sendJSONResponse(res, 404, {message : "No Review to Update"});
           }
         }
       });
  } else {
    sendJSONResponse(res, 404, {message : "locationid and reviewid both are required"});
  }
};

module.exports.reviewsDeleteOne = function(req, res){
  if(req.params.locationid && req.params.reviewid){
    Loc.findById(req.params.locationid)
       .select("review")
       .exec(function(err, locationData){
         if(!locationData) {
           sendJSONResponse(res, 404, {message : "No Location found with the matching id"});
         } else if(err){
           sendJSONResponse(res, 404, err);
         } else {
           if(locationData.review && locationData.review.length > 0){
            if(!locationData.review.id(req.params.reviewid)){
              sendJSONResponse(res, 404, {message : "No Review found with the matching id"});
            } else {
              locationData.review.id(req.params.reviewid).remove();
              locationData.save(function(err){
                if(err){
                  sendJSONResponse(res, 404, err);
                } else {
                  sendJSONResponse(res, 200, {message : "Successfully Removed the Review"});
                }
              });
             }
           } else {
             sendJSONResponse(res, 404, {message : "No Review to Update"});
           }
         }
       });
  } else {
    sendJSONResponse(res, 404, {message : "locationid and reviewid both are required"});
  }
};



var sendJSONResponse = function(res, status, jsonObj){
  res.status(status);
  res.json(jsonObj);
};
