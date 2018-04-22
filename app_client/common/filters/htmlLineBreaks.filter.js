(function(){
  var htmlLineBreaks = function(){
    return function(text){
            var output = text.replace(/\n/g, "<br/>");
            return output;
          };
  };

  angular.module("WifiLocator")
         .filter("htmlLineBreaks", htmlLineBreaks);
})();
