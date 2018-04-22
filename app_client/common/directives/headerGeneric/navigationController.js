(function(){

  var navigationController = function($location, authentication, $scope, $window){
    var vm = this;
    vm.currentPath = $location.path();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentUser = authentication.currentUser();
    vm.logout = function(){
      authentication.logout();
      $window.location.reload();
    };



  };

  angular.module("WifiLocator")
         .controller("navigationController", ["$location", "authentication", "$scope", "$window", navigationController]);
})();
