(function(){

  var aboutController = function($scope, $location){
    vm = this;
    vm.pageHeader = {
      title : "About",
      tagLine : " WifiLocator"
    };

    vm.currentPage = $location.path();
    console.log(vm.currentPage);
    vm.content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec sodales ex, vitae faucibus enim. Aenean facilisis quis metus quis cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec nunc metus, molestie eget neque vitae, varius facilisis sapien. Cras maximus, sapien a iaculis pretium, elit sem pharetra elit, id ullamcorper erat felis non lorem.\n\n mauris est, faucibus in pretium tristique, pellentesque a arcu. Quisque condimentum, eros vel placerat feugiat, arcu ante molestie magna, a mattis nulla nulla ac sapien. Mauris in elit eget diam tincidunt vulputate. Nunc accumsan dui sit amet urna vulputate, quis blandit turpis tincidunt. Donec fermentum laoreet placerat. Morbi libero ante, egestas non efficitur vel, sagittis id sapien. Nam feugiat aliquam enim, at efficitur libero volutpat tincidunt.";
  };

  angular.module("WifiLocator")
         .controller("aboutController", ["$scope", "$location", aboutController]);
})();
