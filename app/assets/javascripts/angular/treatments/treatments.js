angular.module('conservar.treatments',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(function($stateProvider){
  $stateProvider.state( 'treatment', {
    url: '/item/:id/treatments',
    views: {
      "item-main": {
        controller: 'TreatmentsCtrl',
        templateUrl: '/templates/treatment.html'
      }
    }
  });
})

.controller('TreatmentsCtrl', function($scope, $location, $modal, TreatmentRes){
  $scope.inteventions = {};

  $scope.init = function(){
    TreatmentRes.show($stateParams,
      function(data){
        $scope.interventions = data.interventions;
        $scope.item = data.item;
      },
      function(error){
        console.log("error");      
      }
    );
  };

  $scope.close = function(treatment){
    treatment.close({item_id: $scope.item.id});
  };

  $scope.open = function(treatment){
    treatment.open({item_id: $scope.item.id});
  };
})

.factory('TreatmentRes', function($resource){
  var res = $resource("/items/:item_id/treatments/:id.json",
    { id:'@id', item_id: '@item_id' },
    { 
      'query': { method: 'GET', isArray: true},
      'show': { method: 'GET'},
      'create': { method: 'POST' },
      'update': { method:'PUT' },
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'}},
      'close': {method: 'PATCH'},
      'open':  {method: 'PATCH'}
    });
  return res;
});