(function(){

  var detailsController = function($routeParams, wifiLocatorData, $scope, $http, $window, $location, authentication){
    vm = this;

    vm.currentPath = $location.path();
    vm.locid = $routeParams.locationid;
    wifiLocatorData.locationbyId(vm.locid)
      .then(function(response){
        vm.location = response.data.location;
        vm.pageHeader = {
          title : vm.location.name
        };
        console.log(vm.location);
      }, function(err){
        vm.message = "Something is Wrong";
        console.log(err);
      });

      vm.isLoggedIn = authentication.isLoggedIn();
      vm.currentUser = authentication.currentUser();

      vm.addReview  = function(){
      //  console.log(vm.reviewform);
        let req = {
          method : "POST",
          data : {
            details : vm.reviewform.details
          },
          url : "/api/locations/" + vm.locid + "/reviews",
          headers : {
            "Authorization" : "Bearer " + authentication.getToken()
          }
        };
      //  console.log(req.url);
        $http(req).then(function(res){ console.log(res); $window.location.reload(); }, function(err){ console.log(err); });
      };

  };

  angular.module("WifiLocator")
         .controller("detailsController", ["$routeParams", "wifiLocatorData", "$scope","$http", "$window", "$location", "authentication", detailsController]);

})();
