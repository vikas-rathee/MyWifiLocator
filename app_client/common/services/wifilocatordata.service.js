(function(){

var wifiLocatorData = function($http){
  var locationbyCoords = function(position){
    var lng = position.coords.longitude;
    var lat = position.coords.latitude;
     return $http.get("/api/locations?lng=" + lng + "&lat=" + lat +"&maxdistance=100000");
  };

  var locationbyId = function(locationid){
    return $http.get("/api/locations/" + locationid);
  };

  return {
    locationbyCoords : locationbyCoords,
    locationbyId : locationbyId
  };
};

wifiLocatorData.$inject = ["$http"];
angular.module("WifiLocator")
       .service("wifiLocatorData", ["$http", wifiLocatorData]);



 })();
