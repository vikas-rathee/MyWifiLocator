(function(){

  var reviewController = function($uibModalInstance){
    vm = this;
    
    vm.modal = {
      cancel : function(){
        $uibModalInstance.dismiss("cancel");
      }
    };

  };

  angular.module("WifiLocator")
         .controller("reviewController", ["$uibModalInstance", reviewController]);
})();
