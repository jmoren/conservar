angular.module('conservar.intervention',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'intervention', {
    url: '/intervention/:id',
    views: {
      "main": {
        controller: 'InterventionCtrl',
        templateUrl: '/templates/interventions/intervention.html'
      }
    }
  });
})

.controller('InterventionCtrl', function($scope, $stateParams, $http, $modal, InterventionRes){
  // alert
  $scope.alert = { type: "", message: "" };
  $scope.types = { consolidacion: "Consolidacion", limpieza: "Limipeza", montaje: "Montaje", preparacion: "Preparacion" };
  $scope.format = 'dd/MM/yyyy';
  
  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'dd/MM/yyyy',
    startingDay: 1,
    showWeeks: false
  };

  $scope.save = function(intervention){
    intervention.treatment_id = $scope.treatment.id;
    InterventionRes.save({ treatment_id: $scope.treatment.id }, intervention,
      function(data){
        $scope.interventions.push(data);
        $scope.addAlert("success", "Se guardo con exito");
        $scope.intervention.description = "";
        $scope.intervention.intervention_type = "";
      },
      function(data){
        $scope.addAlert("danger", "No pudo guardarse, intente nuevamente");
      }
    );
  };

  $scope.update = function(intervention){
    InterventionRes.update({treatment_id: $scope.treatment.id}, intervention,
      function(data){
        $scope.addAlert("success", "Se actualizo con exito");
        $modalInstance.close();
      },
      function(data){
        $scope.addAlert("danger", "No pudo actualizarse, intente nuevamente");
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

.factory( 'InterventionRes', function ( $resource )  {
  var res = $resource("/treatments/:treatment_id/interventions/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    {
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'} }
    }
  );
  return res;
});


