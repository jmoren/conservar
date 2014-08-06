angular.module('conservar', [
  'ui.router',
  'ngWYSIWYG',
  'ngSanitize',
  'lr.upload',
  'ui.bootstrap',
  'pascalprecht.translate',
  'common.modal',
  'common.pagination',
  'common.search',
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
  'conservar.translation'
  ])

.config( function ConservarConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/collections' );
})

.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
})

.controller( 'ConservarCtrl', function($rootScope, $scope, $location, $http, SearchRes, $translate) {

  $rootScope.current_user = { email: null, lang: 'es' };
  $scope.loggedIn     = false;

  $scope.$on('sessionActive', function(event, user){
    $scope.loggedIn = true;
    $rootScope.current_user = user;
    $translate.use($scope.current_user.lang);
  });

  $scope.$on('loggedIn', function(event, user){
    $scope.loggedIn = true;
    $rootScope.current_user = user;
    $translate.use($scope.current_user.lang);
  });

  $scope.$on('loggedOut', function(){
    $scope.loggedIn = false;
    $rootScope.current_user = { email: null, lang: 'es' };
  });

}).filter("formatDate", function () {
  return function (input, format) {
    if ((input) && (this.current_user.timezone)) {
      return moment.tz(input, this.current_user.timezone).format(format);
    } else {
      return input;
    }
  };
})
.directive('pwCheck', function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  };
});
