(function(){

var pageTitle = function(){
 return{
   scope : {
     data : "="
   },
   templateUrl : "/common/directives/pageTitle/pageTitle.template.html",
   restrict : "E"
 };
};

angular.module("WifiLocator")
       .directive("pageTitle", pageTitle);
})();
