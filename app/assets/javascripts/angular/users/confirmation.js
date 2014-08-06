/**
 * User module
 */
angular.module( 'conservar.confirmation', [
  'ui.router.state',
  'ui.router',
  'ngResource'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'confirmation', {
    url: '/users/confirmation',
    views: {
      "body": {
        controller: 'ConfirmationCtrl',
        templateUrl: '/templates/users/confirmation.html'
      }
    },
    title: "Profile",
    className: 'signin-panel'
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'ConfirmationCtrl', ['$scope', 'UserRes', '$http', '$location', '$stateParams', '$translate',
  function($scope, UsersRes, $http, $location, $stateParams, $translate) {
    $scope.user = new UsersRes();
    $scope.message_error = [];
    $scope.lang = 'es';

    $scope.init = function(){
      $translate.use($scope.lang);
      $scope.token = $location.search().confirmation_token;
      $http({
        url: "/users/confirmation.json?confirmation_token="+$scope.token,
        method: "GET",
        dataType: 'JSON'
      }).then(function(response){
        user = response.data;
        $scope.user.id = user.id;
        $scope.user.email = user.email;
        $scope.user.organization_id = user.organization_id;
        $scope.user.name = user.name;
        $scope.user.last_name = user.last_name;
      },function(error){
        console.log(error);
      });
    };

    $scope.changeLang  = function(key){
      $scope.lang = key;
      $translate.use($scope.lang);
    };

    $scope.confirm = function(user){
      $http({
        url: '/user/confirmation.json',
        method: 'PATCH',
        data: {id: user.id, user: user, confirmation_token: $scope.token}
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