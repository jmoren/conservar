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

.controller('TreatmentCtrl', function($scope, $location, $stateParams, $modal, TreatmentRes, TreatmentNoteRes){
  $scope.inteventions = {};
  $scope.current_note = new TreatmentNoteRes();

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

.directive('treatmentNote', function(){
    return {
        restrict: 'E',
        templateUrl: '/templates/treatmentNoteForm.html',
        scope: {
          note: '=',
          treatment: '='
        },
        controller: function($scope, TreatmentNoteRes) {

          $scope.save = function(note){
            TreatmentNoteRes.save({treatment_id: $scope.treatment.id, treatment_note: note}, 
              function(data){
                console.log(data);
                $scope.treatment.notes.push(data);
                $scope.note.content = "";
              }, function(error){
                console.log(error);
              }
            );
          };
        }
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
})

.factory('TreatmentNoteRes', function($resource){
  var res = $resource("/treatments/:treatment_id/treatment_notes/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    { 
      'update': { method: 'PATCH' },
    });
  return res;
});