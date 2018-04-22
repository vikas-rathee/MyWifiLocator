(function(){

  var loginController = function($location, authentication, $window){
    vm = this;
    vm.pageHeader = {
      title : "LOGIN",
      tagLine : ""
    };
    vm.formError = {
      check : false,
      message : ""
    };
    vm.onSubmit = function()
    {
      authentication.login(vm.logindata)
                    .then(function(response){
                      var token = response.data.token;
                      console.log(token);
                      authentication.saveToken(token);
                      var prevPath = $location.search("path");
                      $location.path("/" + prevPath);
                      $window.location.reload();
                    },function(err){
                      vm.formError.check = true;
                      vm.formError.message = err.data.message;
                      console.log(err);
                    });
    }
  };

  angular.module("WifiLocator")
         .controller("loginController", ["$location", "authentication", "$window", loginController]);
})();
