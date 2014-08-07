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
.config(['$stateProvider', function config( $stateProvider ) {
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
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'UsersCtrl', ['$scope', 'UsersRes', '$location', '$http', '$anchorScroll', '$window',
  function UserController( $scope, UsersRes, $location, $http, $anchorScroll, $window) {
    $scope.alert = { type: "", message: ""};
    $scope.user = new UsersRes();
    $scope.organization = $scope.current_user.organization;
    $scope.users = UsersRes.query({organization_id: $scope.organization.id});
    
    $scope.save = function(user) {
      user.organization_id = $scope.organization.id;
      UsersRes.save({organization_id: $scope.organization.id}, { user: user },
        function(data, status){
          $scope.users.push(data);
          $scope.user.email = "";
          $scope.user.name  = "";
          $scope.user.last_name  = "";
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
            $scope.addAlert('success', "O usaurio "+ user.email + " foi removido!");
          }, 
          function(data){
            console.log(data);
          }
        );
      }
    };

    $scope.reSend = function(user){
      $http({
        url: '/users/confirmation',
        method: 'POST',
        data: { id: user.id, email: user.email }
      }).then(function(response){
        $scope.addAlert('success',response.data.text);
      });
    };

    $scope.addAlert = function(type, message){
      $scope.alert = {type: type, message: message};
    };

    $scope.clear = function() {
      $scope.user.email = "";
      $scope.user.name  = "";
      $scope.user.last_name = "";
    };
    
    $scope.closeAlert = function(index) {
      $scope.alert.type = "";
      $scope.alert.message = "";
    };
  }
]);