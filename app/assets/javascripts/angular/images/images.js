angular.module('conservar.images',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider.state( 'images', {
    url: '/images',
    views: {
      "main": {
        controller: 'ImagesCtrl',
        templateUrl: '/templates/images/images.html'
      }
    },
    title:'Images'
  });
}])

.controller('ImagesCtrl', ['$scope', '$location', '$stateParams', '$modal', 'ImageRes',
  function($scope, $location, $stateParams, $modal, ImagesRes){

    $scope.init = function(){
      ImagesRes.query(
        function(data){
          $scope.images = data;
        },
        function(error){
          console.log("error");      
        }
      );
    };
  }
])

.factory('ImagesRes', ['$resource', function($resource){
  var res = $resource("/images/:id.json",
    { id:'@id' },
    { }
  );
  return res;
}]);