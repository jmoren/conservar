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
    title: "Perfil"
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'ProfileCtrl', ['$rootScope','$scope', 'UsersRes', '$translate',
  function($rootScope, $scope, UsersRes, $translate) {
    $scope.working = false;
    
    $scope.init = function(){
      $scope.editUser = false;
    };

    $scope.save = function(user){
      $scope.working = true;
      UsersRes.update({id: $scope.current_user.id}, {user: user},
        function(data){
          

          message = { message: 'USER.UPDATE.SUCCESS', type: 'success'};
          $scope.$emit('sentMessage', message);

          $scope.working  = false;
          $scope.editUser = false;
        },
        function(error){
          message = { message: 'USER.UPDATE.ERROR', type: 'danger'};
          $scope.$emit('sentMessage', message);
          $scope.working = false;
        }
      );
    };

    $scope.updateLang = function () {
      $translate.use($scope.current_user.lang);
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
