angular.module('conservar.treatment',[
  'ui.router.state',
  'ui.router',
  'ngResource',
  'lr.upload',
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider.state( 'treatment', {
    url: '/items/:item_id/treatments/:id',
    views: {
      "main": {
        controller: 'TreatmentCtrl',
        templateUrl: '/templates/treatments/treatment.html'
      }
    },
    title:'Tratamento'
  });
}])

.controller('TreatmentCtrl', ['$scope', '$location', '$stateParams', 'TreatmentRes', 'TreatmentNoteRes', 'InterventionRes', 'ExamRes', 'upload', 
  function($scope, $location, $stateParams, $modal, TreatmentRes, TreatmentNoteRes, InterventionRes, ExamRes, upload){
    $scope.alert = { type: "", message: "" };
    $scope.current_note         = new TreatmentNoteRes();
    $scope.current_intervention = new InterventionRes();
    $scope.current_exam         = new ExamRes();

    $scope.tabs = {
      actions: { active: true, name: 'INTERVENTIONS'},
      exams: { active: false, name: 'EXAMS'},
      notes: { active: false, name: 'NOTES'},
    };

    $scope.init = function(){
      TreatmentRes.get($stateParams,
        function(data){
          $scope.treatment        = data.treatment;
          $scope.images           = data.images;
          $scope.notes            = data.notes;
          $scope.interventions    = data.interventions;
          $scope.treatment_status = data.status;
          $scope.item             = data.item;
          $scope.exams            = data.exams;
        },
        function(error){
          console.log("error");
        }
      );
    };

    $scope.openTab = function(current_tab){
      angular.forEach($scope.tabs, function(tab){
        if(tab.name == current_tab.name)
          current_tab.active = true;
        else
          tab.active = false;
      });
    };

    $scope.openAndScroll = function(hash){
      if(hash === 'imagesPanel')
        $scope.toggleImages = true;
      if(hash === 'detailsPanel')
        $scope.toggleDetails = true;
      $location.hash(hash);
    };

    $scope.doUpload = function(data){
      upload({
        url: '/treatments/'+$scope.treatment.id+'/images.json',
        method:"POST",
        data: {
          "image[treatment_id]": $scope.treatment.id,
          "image[item_id]": $scope.treatment.item_id,
          "image[photo]": $("#file")[0].files[0],
          "image[description]": data.description,
          "image[intervention_id]": data.intervention_id,
          "image[show_report]": data.show_report
        }
      }).then(
        function (response) {
          $scope.images.push(response.data.image);
          data.description = "";
          data.intervention_id = "";
          $("#imageForm")[0].reset();
        },
        function (response) {
          console.log(response);
        }
      );
    };

    $scope.update = function(treatment){
      TreatmentRes.update({item_id: treatment.item_id, id: $scope.treatment.id}, treatment, function(){
        $scope.editDiagnosis = false;
        $scope.editProposal  = false;
      });
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

    $scope.openModalExam = function(exam){
      $modalInstance = $modal.open({
        resolve: {
          element: function(){
            return exam;
          }
        },
        scope: $scope,
        controller: 'modalCtrl',
        templateUrl: "../templates/exams/modalExam.html"
      });
    };

    $scope.removeNote = function(note){
      TreatmentNoteRes.remove({treatment_id: $scope.treatment.id }, note,
        function(data){
          index = $scope.notes.indexOf(note);
          $scope.notes.splice(index,1);
          $scope.addAlert("success", "Se elimino con exito");
        },
        function(data){
          $scope.addAlert("danger", "No pudo eliminarse, intente nuevamente");
        }
      );
    };

    $scope.removeExam = function(exam){
      ExamRes.remove({treatment_id: $scope.treatment.id}, exam,
        function(data){
          index = $scope.exams.indexOf(exam);
          $scope.exams.splice(index,1);
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
          index = $scope.interventions.indexOf(intervention);
          $scope.interventions.splice(index,1);
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
  }
])

.directive('treatmentNote', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/treatments/treatmentNoteForm.html',
    scope: {
      treatment: '=treatment',
      notes: '=notes'
    },
    controller: function($scope, TreatmentNoteRes) {
      $scope.save = function(note){
        TreatmentNoteRes.save({treatment_id: $scope.treatment.id}, note,
          function(data){
            $scope.notes.push(data);
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
    templateUrl: '/templates/interventions/interventionForm.html',
    scope: {
      treatment: "=treatment",
      interventions: "=interventions"
    },
    controller: 'InterventionCtrl'
  };
})

.directive('examForm', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/exams/examForm.html',
    scope: {
      treatment: "=treatment",
      exams: "=exams"
    },
    controller: 'ExamCtrl'
  };
})

.factory('TreatmentRes', ['$resource', function($resource){
  var res = $resource("/items/:item_id/treatments/:id.json",
    { id:'@id', item_id: '@item_id' },
    {
      'update': { method: 'PATCH' },
      'close': {method: 'POST'},
      'open': {method: 'POST'},
    });
  return res;
}])

.factory('TreatmentNoteRes', ['$resource', function($resource){
  var res = $resource("/treatments/:treatment_id/treatment_notes/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    {
      'update': { method: 'PATCH' }
    });
  return res;
}]);
