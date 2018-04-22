(function(){

  var registerController = function($location, authentication){
    vm = this;
    vm.pageHeader = {
      title : "Register",
      tagLine : ""
    };
    vm.uexists = false;
    vm.onSubmit = function(){
      // console.log(vm.registerdata);
      authentication.register(vm.registerdata)
                    .then(function(response){
                      alert("You are registered Successfully!\nYou can login now!");
                      var loginURL = "/login?path=" + $location.search().path;
                      $location.url(loginURL);
                    }, function(err){
                      vm.uexists = true;
                      console.log(err.status);

                    });


    };
  };

  angular.module("WifiLocator")
         .controller("registerController", ["$location","authentication", registerController]);
})();



function changePassType(){
  var elem = document.getElementById("pass");
  if(elem.type === "password"){
    elem.type = "text";
  }
  else {
    elem.type = "password";
  }
}
