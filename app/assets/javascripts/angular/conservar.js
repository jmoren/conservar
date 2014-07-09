angular.module('conservar',[
  'ui.router',
  'ngWYSIWYG',
  'ngSanitize',
  'common.modal',
  'common.pagination',
  'common.authentication',
  'conservar.item_detail',
  'conservar.intervention',
  'conservar.item',
  'conservar.treatment',
  'conservar.treatments',
  'conservar.collection',
  'conservar.collections',
  'conservar.images',
  'conservar.image',
  'conservar.exam',
  'conservar.exams',
  'conservar.dashboard',
  'conservar.reports',
  'conservar.users',
  'conservar.profile',
  'conservar.login',
  'conservar.organization',
  'conservar.users',
  'conservar.confirmation',
  'lr.upload',
  'ui.bootstrap'
  ])

.config( function ConservarConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
})

.controller( 'ConservarCtrl', function($rootScope, $scope, $location, $http) {
  
  $scope.current_user = { email: null };
  $scope.loggedIn     = false;
  
  $scope.$on('sessionActive', function(event, user){
    $scope.loggedIn = true;
    $scope.current_user = user;
  });

  $scope.$on('loggedIn', function(event, user){
    $scope.loggedIn = true;
    $scope.current_user = user;
    //$scope.alert.showBox('You are logged in. ','Welcome back '+user.email, 'alert-success');
  });

  $scope.$on('loggedOut', function(){
    $scope.loggedIn = false;
    //$scope.alert.showBox('You are logged out. ','Goodbye '+$scope.current_user.email, 'alert-success');
    $scope.current_user = { email: null };
  });

});