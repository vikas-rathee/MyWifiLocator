(function(){

  var authentication = function($window, $http){

    var saveToken = function(token){
      $window.localStorage["wl-token"] = token;
    };

    var getToken = function(){
      return $window.localStorage["wl-token"];
    };

    var register = function(user){
      var req = {
        method : "POST",
        url : "/api/register",
        data : user
      };
      // console.log(user);
      return $http(req);
    };

    var login = function(user){
      var req = {
        method : "POST",
        url : "/api/login",
        data : user
      };
      // console.log(user);
        return $http(req);
    };

    var logout = function(){
      $window.localStorage.removeItem("wl-token");
    };

    var isLoggedIn = function(){
      var token = getToken();

      if(token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));
      //  console.log(payload);
        //console.log(parseInt(Date.now() / 1000));
        return payload.exp > (Date.now() / 1000);
      } else {
        return false;
      }
    };

    var currentUser = function(){
      if(isLoggedIn()){
        var token = getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    return {
      saveToken : saveToken,
      getToken : getToken,
      register : register,
      login : login,
      logout : logout,
      isLoggedIn : isLoggedIn,
      currentUser : currentUser
    };
  };

  angular.module("WifiLocator")
         .service("authentication", ["$window", "$http", authentication]);
})();
