
var mongoose = require("mongoose");
var Loc = require("../models/locations");

module.exports.locationsListByDistance = function(req, res){
  if((req.query.lng || req.query.lng === 0) && (req.query.lat || req.query.lng === 0) && req.query.maxdistance){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maximumDistance = parseFloat(req.query.maxdistance);

    console.log(lng, lat, maximumDistance);

    var distanceConverter = (function(){
      var mToKm = function(m){
        return parseFloat(m / 1000);
      };

      var kmToM = function(km){
        return parseFloat(km * 1000);
      };

      return {
        mToKm : mToKm,
        kmToM : kmToM
      };
    })();

    var geoPoint = {
      type : "Point",
      coordinates : [lng, lat]
    };

    var modifyLocationList = function(results){
      var locationList = [];
      results.forEach(function(data){
        locationList.push({
          name : data.name,
          address : data.address,
          facilities : data.facilities,
          distance : data.dist.calculated,
          id : data._id
        });
      });
      return locationList;
    };

    Loc.aggregate([
      {
        $geoNear : {
          near : geoPoint,
          spherical : true,
          maxDistance : maximumDistance,
          distanceField : "dist.calculated"
        }
      }
    ], function(err, results){     //An array containing the locations is returned
      if(err){
        // console.log(err);
        sendJSONResponse(res, 404, err);
      } else {
        // console.log(results);
        var locations = modifyLocationList(results);
        sendJSONResponse(res, 200, locations);
      }
    }

   );


  } else {
    sendJSONResponse(res, 404, {message : "Latitude, Longitude and max distance(in metres) is required"});
  }
};

module.exports.locationsCreate = function(req, res){
  Loc.create(req.body, function(err, locationData){
    if(err){
      sendJSONResponse(res, 404, err);
    } else {
      sendJSONResponse(res, 404, {
        message : "New Location added",
        location : locationData
      });
    }
  });
}

module.exports.locationsReadOne = function(req, res){
  if(req.params && req.params.locationid){
    Loc.findById(req.params.locationid, function(err, locationData){
      if(!locationData){
        sendJSONResponse(res, 404, {message : "No Location found with the matching id"});
      } else if (err){
        sendJSONResponse(res, 404, err);
      } else {
        sendJSONResponse(res, 200, {
          message: "Successfully Found the location",
          location : locationData
        });
      }
    });
  } else {
    sendJSONResponse(res, 404, {message: "locationid is required"});
  }
};


module.exports.locationsDeleteOne = function(req, res){
  if(req.params && req.params.locationid){
    Loc.findByIdAndRemove(req.params.locationid, function(err, locationData){
      if(!locationData){
        sendJSONResponse(res, 404, {message : "No Location found with the matching id"});
      } else if (err){
        sendJSONResponse(res, 404, err);
      } else {
        sendJSONResponse(res, 200, {
          message: "Successfully Deleted the location",
          location : locationData
        });
      }
    });
  } else {
    sendJSONResponse(res, 404, {message: "locationid is required"});
  }
};

module.exports.locationsUpdateOne = function(req, res){
  if(req.params.locationid){
    Loc.findById(req.params.locationid)
       .select("-review -openingTime")  // don't want to retrieve review and openingTimebut everything else is retrieved
       .exec(function(err, locationData){
         if(!locationData){
           sendJSONResponse(res, 404, {message : "No location found with matching id"});
         } else if(err){
           sendJSONResponse(res, 404, err);
         } else {
           if(req.body.name)
            locationData.name = req.body.name;
           if(req.body.address)
           locationData.address = req.body.address;
           if(req.body.coords)
           locationData.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
           if(req.body.facilities)
           locationData.facilities = req.body.facilities.split(",");

           locationData.save(function(err, locationData){
             if(err){
               sendJSONResponse(res, 404, err);
             } else {
               sendJSONResponse(res, 200, locationData);
             }

           });
         }
       });

  } else {
    sendJSONResponse(res, 404, {message: "locationid is required"});
  }
};

var sendJSONResponse = function(res, status, jsonObj){
  res.status(status);
  res.json(jsonObj);
};
