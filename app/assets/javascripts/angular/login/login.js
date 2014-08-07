angular.module('conservar.login',[
  'ui.router',
  'ui.router.state'
]).

config(['$stateProvider', '$httpProvider', function config( $stateProvider, $httpProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "body": {
        controller: 'LoginCtrl',
        templateUrl: '/templates/login.html'
      }
    },
    title:'Login',
    className: 'signin-panel'
  });
}]).

controller('LoginCtrl', ['$http', '$location', '$scope', '$rootScope', '$translate',
  function($http, $location, $scope, $rootScope, $translate){  
    $scope.user        = { email: null, password: null, lang: null};
    $scope.login_error = { message: null};
    $scope.lang        = 'es';
    
    $scope.init = function(){
      $translate.use($scope.lang);
    };

    $scope.changeLang  = function(key){
      $scope.lang = key;
      $translate.use($scope.lang);
    };

    $scope.login = function(user){
      console.log('first request');
      $http({
        url: "/users/sign_in.json",
        method: 'POST',
        data: { user: {email: user.email, password: user.password } }
      }).success(function(data, status){
        if(status === 200 || status === 201){
          $rootScope.$broadcast('loggedIn', data);
          $location.path("/");      
        }else{
          $scope.login_error.message = data.error;
        }
      }).error(function(error, status){
        console.log(error);
      });
    };
  }
]);