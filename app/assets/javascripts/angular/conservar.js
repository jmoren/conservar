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
  'conservar.translation',
  'conservar.recover',
  'conservar.reset'
  ])

.config(['$stateProvider', '$urlRouterProvider', function ConservarConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/collections' );
}])

.run(['$rootScope', '$state', '$stateParams',  function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
}])

.controller('ConservarCtrl', ['$rootScope', '$scope', '$location', '$http', 'SearchRes', '$translate',
  function($rootScope, $scope, $location, $http, SearchRes, $translate) {
    $scope.alert = {};
    $scope.loggedIn     = false;

    $scope.getUser = function(){
      if(!$scope.user_present){
        $http({
          url: '/current_user.json',
          method: 'GET'
        }).success(function(data, status){
          if(status == 201 || status == 200){
            $rootScope.$broadcast('sessionActive', data );
          }
        }).error(function(data, status){
          //$scope.alert.showBox('Unexpected Error', "Contact the admins to solve this issue", 'alert-danger');
        });
      }
    };

    // hack to remove zoomcontainer from body
    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
      if(from.name === 'singleImage')
        $('.zoomContainer').remove();
    });
    
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
      $rootScope.current_user = { email: null, lang: 'es', organization: {} };
    });

    $scope.$on('sentMessage', function(event, data){
      $scope.alert = {
        message: data.message,
        type: data.type,
        open: true
      };
    });

    $scope.closeAlert = function () {
      $scope.alert.open = false;
    };

    $scope.getUser();
  }
])

.filter("formatDate", function () {
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
