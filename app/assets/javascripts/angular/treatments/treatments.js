angular.module('conservar.treatments',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(function($stateProvider){
  $stateProvider.state( 'treatments', {
    url: '/treatments',
    views: {
      "main": {
        controller: 'TreatmentsCtrl',
        templateUrl: '/templates/treatments/treatments.html'
      }
    }
  });
})

.controller('TreatmentsCtrl', function($scope, $location, $stateParams, $modal, TreatmentsRes){

  $scope.init = function(){
    TreatmentsRes.query(
      function(data){
        console.log(data);
        $scope.treatments = data;
      },
      function(error){
        console.log("error");      
      }
    );
  };
})

.factory('TreatmentsRes', function($resource){
  var res = $resource("/treatments/:id.json",
    { id:'@id' },
    { }
  );
  return res;
});