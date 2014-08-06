angular.module('conservar.reports',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'reports', {
    url: '/reports',
    views: {
      "main": {
        controller: 'ReportsCtrl',
        templateUrl: '/templates/reports/reports.html'
      }
    }
  });
})

.controller('ReportsCtrl', function($scope, $http, ReportRes, ReportsRes){
  // alert
  $scope.alert = { type: "", message: "" };
  
  $scope.init = function(){
    ReportsRes.query(function(data){
      $scope.reports = data;
    });
  };

  $scope.remove = function(report){
    res = confirm("Estas seguro?");
    if(res){
      ReportRes.remove({ collection_id: report.collection_id, id: report.id }, report, 
        function(data){
          index = $scope.reports.indexOf(report);
          $scope.reports.splice(index,1);
        }, 
        function(error){
          console.log(error);
        }
      );
    }
  };

  $scope.addAlert = function(type, message){
    $scope.alert = {type: type, message: message};
  };

  $scope.closeAlert = function(index) {
    $scope.alert.type = "";
    $scope.alert.message = "";
  };
})

.factory( 'ReportRes', function ( $resource )  {
  var res = $resource("/collections/:collection_id/reports/:id.json",
    { id:'@id', collection_id: '@collection_id' },
    {
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'} }
    }
  );
  return res;
})

.factory( 'ReportsRes', function ( $resource )  {
  var res = $resource("/reports/:id.json",
    { id:'@id' },
    {}
  );
  return res;
});


