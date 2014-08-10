angular.module('conservar.treatments',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider.state( 'treatments', {
    url: '/treatments',
    views: {
      "main": {
        controller: 'TreatmentsCtrl',
        templateUrl: '/templates/treatments/treatments.html'
      }
    },
    title:'TREATMENT.PLUR'
  });
}])

.controller('TreatmentsCtrl', ['$scope', '$location', '$stateParams', '$modal', 'TreatmentsRes',
  function($scope, $location, $stateParams, $modal, TreatmentsRes){
    $scope.loading = true;
    
    $scope.init = function(){
      TreatmentsRes.query(
        function(data){
          $scope.treatments = data;
          $scope.loading    = false;
        },
        function(error){
          console.log("error");      
        }
      );
    };
  }
])

.factory('TreatmentsRes', ['$resource', function($resource){
  var res = $resource("/treatments/:id.json",
    { id:'@id' },
    { }
  );
  return res;
}]);