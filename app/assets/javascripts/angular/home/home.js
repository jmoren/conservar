angular.module('conservar.dashboard',[
  'ui.router.state',
  'ui.router'
])

.config( function( $stateProvider ){
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
})

.controller('DashboardCtrl', ['$scope', function($scope){
  $scope.currentUser = {};
}]);