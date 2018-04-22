(function(){

var formatDistance = function(){ // A custom filter
  return function(data){
    var unit;
    if(data > 1000){
      data = parseFloat(data / 1000).toFixed(1);
      unit = "km";
    } else {
      data = parseInt(data, 10);
      unit = "m";
    }
    return data + unit;
  }
};


angular.module("WifiLocator")
       .filter("formatDistance", formatDistance);


})();
