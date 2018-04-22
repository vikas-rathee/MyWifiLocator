(function(){
var footerGeneric = function(){
  return {
    restrict : "E",
    templateUrl : "/common/directives/footerGeneric/footerGeneric.template.html"
  };
};


angular.module("WifiLocator")
       .directive("footerGeneric", footerGeneric);

})();
