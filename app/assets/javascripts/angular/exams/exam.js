angular.module('conservar.exam',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state( 'exam', {
    url: '/exams/:id',
    views: {
      "main": {
        controller: 'ExamCtrl',
        templateUrl: '/templates/exams/exam.html'
      }
    }
  });
}])

.controller('ExamCtrl', ['$scope', '$stateParams', '$http', '$modal', 'ExamRes', 
  function($scope, $stateParams, $http, $modal, ExamRes){
    $scope.alert = { type: "", message: "" };
    
    $scope.save = function(exam){
      exam.treatment_id = $scope.treatment.id;
      exam.item_id      = $scope.treatment.item_id;
      ExamRes.save({ treatment_id: $scope.treatment.id }, exam,
        function(data){
          $scope.exams.push(data);
          $scope.addAlert("success", "Foi salvado com suceso");
          $scope.exam.name = "";
          $scope.exam.result = "";
          $scope.exam.observations = "";
        },
        function(data){
          $scope.addAlert("danger", "Nao foi salvado, volte a intentar mais tarde");
        }
      );
    };

    $scope.update = function(exam){
      ExamRes.update({treatment_id: $scope.treatment.id}, exam,
        function(data){
          $scope.addAlert("success", "Foi atualizado com suceso");
          $modalInstance.close();
        },
        function(data){
          $scope.addAlert("danger", "Nao foi atualizado, volte a intentar mais tarde");
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

.factory('ExamRes', ['$resource', function ( $resource )  {
  var res = $resource("/treatments/:treatment_id/exams/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    {
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'} }
    }
  );
  return res;
}]);


