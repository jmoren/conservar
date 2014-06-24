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
        templateUrl: '/templates/treatments/treatment.html'
      }
    }
  });
})

.controller('TreatmentCtrl', function($scope, $location, $stateParams, $modal, TreatmentRes, TreatmentNoteRes, InterventionRes){
  $scope.alert = { type: "", message: "" };
  $scope.current_note = new TreatmentNoteRes();
  $scope.current_intervention = new InterventionRes();

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

  $scope.openModalIntervention = function(intervention){
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return intervention;
        }
      },
      scope: $scope,
      controller: 'modalCtrl',
      templateUrl: "../templates/interventions/modalIntervention.html"
    });
  };

  $scope.removeNote = function(note){
    TreatmentNoteRes.remove({treatment_id: $scope.treatment.id }, note,
      function(data){
        index = $scope.treatment.notes.indexOf(note);
        $scope.treatment.notes.splice(index,1);
        $scope.addAlert("success", "Se elimino con exito");
      },
      function(data){
        $scope.addAlert("danger", "No pudo eliminarse, intente nuevamente");
      }
    );    
  };

  $scope.removeIntervention = function(intervention){
    InterventionRes.remove({treatment_id: $scope.treatment.id}, intervention,
      function(data){
        index = $scope.treatment.interventions.indexOf(intervention);
        $scope.treatment.interventions.splice(index,1);
        $scope.addAlert("success", "Se elimino con exito");
      },
      function(data){
        $scope.addAlert("danger", "No pudo eliminarse, intente nuevamente");
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

.directive('treatmentNote', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/treatments/treatmentNoteForm.html',
    scope: {
      treatment: '=treatment'
    },
    controller: function($scope, TreatmentNoteRes) {
      $scope.save = function(note){
        TreatmentNoteRes.save({treatment_id: $scope.treatment.id}, note, 
          function(data){
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

.directive('interventionForm', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/interventions/InterventionForm.html',
    scope: {
      treatment: "=treatment"
    },
    controller: 'InterventionCtrl'
  };
})

.factory('TreatmentRes', function($resource){
  var res = $resource("/items/:item_id/treatments/:id.json",
    { id:'@id', item_id: '@item_id' },
    { 
      'update': { method: 'PATCH' },
      'close': {method: 'POST'},
      'open': {method: 'POST'},
    });
  return res;
})

.factory('TreatmentNoteRes', function($resource){
  var res = $resource("/treatments/:treatment_id/treatment_notes/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    { 
      'update': { method: 'PATCH' }
    });
  return res;
});