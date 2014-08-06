/**
 * User module
 */
angular.module( 'conservar.profile', [
  'ui.router.state',
  'ui.router',
  'ngResource'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'profile', {
    url: '/users/me',
    views: {
      "main": {
        controller: 'ProfileCtrl',
        templateUrl: '/templates/users/profile.html'
      }
    },
    title: "Profile"
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'ProfileCtrl', ['$scope', 'UserRes', '$location', '$http', '$anchorScroll', '$translate',
  function($scope, UsersRes, $location, $http, $anchorScroll, $translate) {
    $scope.init = function(){
      $scope.user = $scope.current_user;
      $scope.editUser = false;
    };

    $scope.save = function(user){
      UsersRes.update({id: $scope.current_user.id}, {user: user},
        function(data){
          $scope.editUser = false;
          $translate.use(user.lang);
        },
        function(error){
          console.log(error);
        }
      );
    };
  }
])

/**
 * Add a resource to allow us to get at the server
 */
.factory( 'UsersRes', ['$resource', function ( $resource )  {
  var res = $resource("../users/:id.json",
    { id:'@id' },
    {
      'update': { method: "PATCH"},
      'remove' : {method: 'DELETE', isArray: false, headers: {'Content-Type': 'application/json'}}
    });
  return res;
}]);
