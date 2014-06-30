angular.module('conservar.exams',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'exams', {
    url: '/exams',
    views: {
      "main": {
        controller: 'ExamsCtrl',
        templateUrl: '/templates/exams/exams.html'
      }
    },
    title:'Analises'
  });
})

.controller('ExamsCtrl', function($scope, ExamsRes){
  // alert
  $scope.alert = { type: "", message: "" };
  
  $scope.init = function(){
    ExamsRes.query(
      function(data){
        $scope.exams = data;
      },
      function(error){
        $scope.addAlert("danger", "Nao foi possivel trazer os analises.");
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

.factory('ExamsRes', function($resource){
  var res = $resource("/exams/:id.json",
    { id:'@id' },
    { }
  );
  return res;
});


