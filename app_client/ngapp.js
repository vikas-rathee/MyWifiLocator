(function(){

var config = function($routeProvider, $locationProvider){
  $routeProvider.when("/", {
    templateUrl : "/views/home/homeView.html",
    controller : "homeController",
    controllerAs : "vm"
  })
  .when("/about", {
    templateUrl : "/views/about/about.view.html",
    controller : "aboutController",
    controllerAs : "vm"
  })
  .when("/location/:locationid", {
    templateUrl : "/views/details/details.view.html",
    controller : "detailsController",
    controllerAs : "vm"
  })
  .when("/register",{
    templateUrl : "/views/register/register.view.html",
    controller : "registerController",
    controllerAs : "vm"
  })
  .when("/login",{
    templateUrl : "/views/login/login.view.html",
    controller : "loginController",
    controllerAs : "vm"
  })
  .otherwise({redirectTo : "/"});

  $locationProvider.html5Mode(true)
                    .hashPrefix('!'); // html5mode requires <base> tag in the head of the SPA. https://code.angularjs.org/1.6.5/docs/error/$location/nobase
};




// config.$inject = ["$routeProvider"];
angular.module("WifiLocator", ["ngRoute", "ngSanitize", "ngAnimate", "ngTouch", "ui.bootstrap"])
       .config(["$routeProvider", "$locationProvider", config]);

})();
