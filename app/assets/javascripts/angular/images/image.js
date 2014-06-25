angular.module('conservar.image',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(function($stateProvider){
  $stateProvider.state( 'image', {
    url: '/treatments/:treatment_id/images/:id',
    views: {
      "main": {
        controller: 'ImageCtrl',
        templateUrl: '/templates/images/image.html'
      }
    }
  });
})

.controller('ImageCtrl', function($scope, $location, $stateParams, ImageRes){
  $scope.alert = { type: "", message: "" };

  $scope.init = function(){
    ImageRes.get($stateParams,
      function(data){
        $scope.image = data.image;
      },
      function(error){
        console.log("error");      
      }
    );
  };

  $scope.addAlert = function(type, message){
    $scope.alert = {type: type, message: message};
  };

  $scope.closeAlert = function(index) {
    $scope.alert.type = "";
    $scope.alert.message = "";
  };

})

.directive('ngElevateZoom', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      
      console.log(attrs.zoomImage);
      //Will watch for changes on the attribute
      attrs.$observe('zoomImage',function(){
        linkElevateZoom();
      });

      function linkElevateZoom(){
        //Check if its not empty
        if (!attrs.zoomImage) return;
        
        element.attr('data-zoom-image',attrs.zoomImage);
        $(element).elevateZoom({zoomType  : "lens", lensShape : "round", lensSize : 200});
      }
      
      linkElevateZoom();
    }
  };
}) 

.factory('ImageRes', function($resource){
  var res = $resource("/treatments/:treatment_id/images/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    { 
      'update': { method: 'PATCH' }
    });
  return res;
});