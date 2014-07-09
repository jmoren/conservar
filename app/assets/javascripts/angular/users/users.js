/**
 * User module
 */
angular.module( 'conservar.users', [
  'ui.router.state',
  'ui.router',
  'ngResource'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'users', {
    url: '/organization/:id/users',
    views: {
      "main": {
        controller: 'UsersCtrl',
        templateUrl: '/templates/users/users.html'
      }
    },
    title: "Usuarios"
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'UsersCtrl', function UserController( $scope, UsersRes, $location, $http, $anchorScroll, $window) {
  
  $scope.user = new UsersRes();
  $scope.organization = $scope.current_user.organization;
  $scope.users = UsersRes.query({organization_id: $scope.organization.id});
  
  $scope.save = function(user) {
    user.organization_id = $scope.organization.id;
    UsersRes.save({organization_id: $scope.organization.id}, { user: user },
      function(data, status){
        $scope.users.push(data);
      },
      function(data, status){
        console.log(data);
      }
    );
  };

  $scope.delete = function(user) {
    if($window.confirm("Tem certeza que você quer deletar o usuario " + user.email + " de sua oganização?")){
      user.$remove(
        function(data, status){
          index = $scope.users.indexOf(user);
          $scope.users.splice(index, 1);
        }, 
        function(data){
          console.log(data);
        }
      );
    }
  };
});