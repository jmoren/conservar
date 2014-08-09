angular.module('conservar.dashboard',[
  'ui.router.state',
  'ui.router'
])

.config(['$stateProvider', function( $stateProvider ){
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      "main": {
        controller: 'DashboardCtrl',
        templateUrl: '/templates/dashboard.html'
      }
    },
    title: 'Dashboard'
  });
}])

.controller('DashboardCtrl', ['$rootScope', '$scope', '$http', '$location',
  function($rootScope, $scope, $http, $location){
    $scope.current_user = { email: null };

    $scope.user_present = false;

    $scope.logout = function() {
      resp = confirm("Are you being disconnected. Are you sure?");
      if(resp){
        $http({method: "DELETE", url: '/users/sign_out.json'}).
          success(function(data, status, headers){
            if(status == 201 || status == 204){
              $rootScope.$broadcast('loggedOut');
              $location.path("/login");
            }
          }).
          error(function(data, status, headers){
            //$scope.alert.showBox('Unexpected Error', "Contact the admins to solve this issue", 'alert-danger');
          });
      }
    };
  }
]);