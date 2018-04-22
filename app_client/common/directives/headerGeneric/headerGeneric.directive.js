(function(){
var headerGeneric = function(){
  return {
    restrict : "EA",
    templateUrl : "/common/directives/headerGeneric/headerGeneric.template.html",
    controller : "navigationController",
    controllerAs : "vm"
  };
};

angular.module("WifiLocator")
       .directive("headerGeneric", headerGeneric);

})();
