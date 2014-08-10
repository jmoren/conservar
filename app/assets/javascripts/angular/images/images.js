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
    title:'IMAGE.PLUR'
  });
}])

.controller('ImagesCtrl', ['$scope', '$location', '$stateParams', '$modal', 'ImagesRes',
  function($scope, $location, $stateParams, $modal, ImagesRes){
    $scope.loading = true;
    
    $scope.init = function(){
      ImagesRes.query(
        function(data){
          $scope.images  = data;
          $scope.loading = false;
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