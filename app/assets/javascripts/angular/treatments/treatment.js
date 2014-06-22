angular.module('conservar.treatment',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(function($stateProvider){
  $stateProvider.state( 'treatment', {
    url: '/items/:item_id/treatments/:id',
    views: {
      "main": {
        controller: 'TreatmentCtrl',
        templateUrl: '/templates/treatment.html'
      }
    }
  });
})

.controller('TreatmentCtrl', function($scope, $location, $stateParams, $modal, TreatmentRes){
  $scope.inteventions = {};

  $scope.init = function(){
    TreatmentRes.get($stateParams,
      function(data){
        $scope.treatment = data.treatment;
      },
      function(error){
        console.log("error");      
      }
    );
  };
})

.factory('TreatmentRes', function($resource){
  var res = $resource("/items/:item_id/treatments/:id.json",
    { id:'@id', item_id: '@item_id' },
    { 
      'update': { method: 'PATCH' },
      'destroy': { method: 'DELETE', headers: {'Content-Type': 'application/json'}},
      'close': {method: 'POST'},
      'open': {method: 'POST'},
    });
  return res;
});