(function(){

var geoLocation = function(){
  var geoPosition = function(cbSuccess, cbError, cbNoGeo){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
    } else {
      cbNoGeo();
    }
  };

  return {
    geoPosition : geoPosition
  };
};


angular.module("WifiLocator")
       .service("geoLocation", geoLocation);



 })();
