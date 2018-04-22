(function(){

var homeController = function($scope, geoLocation, wifiLocatorData, $location){
  vm = this;
 vm.pageHeader = {
    title : "WifiLocator",
    tagLine : "Find Wifis & Food near you!"
 };

 vm.currentPage = $location.path();
 console.log(vm.currentPage);

 vm.aside1 = "Hungry and want a place to use wifi ";
 vm.aside2 = "will help you to find the perfect destination.";


 vm.message = "Searching for Locations";

 vm.geoData = function(position){
   wifiLocatorData.locationbyCoords(position)
     .then(function(response){
       console.log(response.data);
       vm.message = response.data.length > 0 ? "":"No location found";
       vm.data = response.data;
     }, function(err){
       vm.message = "Something is Wrong";
       console.log(err);
     });
 };

 vm.geoError = function(error){
   $scope.$apply(function(){
     vm.message = error.message;
   });
 };

 vm.noGeo = function(){
   $scope.apply(function(){
     vm.message = "Geolocation not supported by browser";
   });
 };

 geoLocation.geoPosition(vm.geoData, vm.geoError, vm.noGeo);
};

angular.module("WifiLocator")
       .controller("homeController", ["$scope", "geoLocation", "wifiLocatorData","$location", homeController]);

})();
