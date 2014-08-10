/**
 * User module
 */
angular.module( 'conservar.reset', [
  'ui.router.state',
  'ui.router',
  'ngResource'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'reset', {
    url: '/users/password/edit',
    views: {
      "body": {
        controller: 'ResetCtrl',
        templateUrl: '/templates/users/reset.html'
      }
    },
    className: 'signin-panel'
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller('ResetCtrl', ['$scope', 'UsersRes', '$http', '$location', '$stateParams', '$translate',
  function($scope, UsersRes, $http, $location, $stateParams, $translate) {
    $scope.user = new UsersRes();
    $scope.lang = 'es';

    $scope.init = function(){
      $translate.use($scope.lang);
      $scope.token = $location.search().reset_password_token;
      $http({
        url: "/users/password/edit.json?reset_password_token="+$scope.token,
        method: "GET",
        dataType: 'JSON'
      }).then(function(response){
        $scope.user.password = "";
        $scope.user.password_confirmation = "";
      },function(error){
        console.log(error);
      });
    };

    $scope.changeLang  = function(key){
      $scope.lang = key;
      $translate.use($scope.lang);
    };

    $scope.resetPassword = function(user){
      $http({
        url: '/users/password.json',
        method: 'PATCH',
        data: { user: { password: user.password, password_confirmation: user.password_confirmation, reset_password_token: $scope.token } }
      }).then(
        function(data){
          $location.path("/");
        },
        function(response){
          $scope.message_error = response.data.errors;
          console.log($scope.message_error);
        }
      );
    };

    $scope.goTo = function(location){
      $location.path(location);
    };
  }
]);