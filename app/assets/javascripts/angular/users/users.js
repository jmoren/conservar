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
    title: "USER.PLUR"
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'UsersCtrl', ['$scope', 'UsersRes', '$location', '$http', '$modal',
  function UserController ($scope, UsersRes, $location, $http, $modal) {
    $scope.user = new UsersRes();
    $scope.loading = false;
    $scope.working = false;

    $scope.init = function(){
      $scope.loading = true;
      UsersRes.query( 
        function(response){
          $scope.users = response;
          $scope.loading = false;
        }, function(error){
          message = { message: 'USER.LOADING.ERROR', type: 'danger'};
          $scope.$emit('sentMessage', message);
          $scope.loading = false;
        }
      );
    };
    
    $scope.save = function(user) {
      $scope.working = true;
      UsersRes.save({ user: user },
        function(data, status){
          $scope.users.push(data);
          $scope.cleanForm();
          $scope.working = false;
          message = { message: 'USER.CREATE.SUCCESS', type: 'success'};
          $scope.$emit('sentMessage', message);
        },
        function(data, status){
          message = { message: 'USER.CREATE.ERROR', type: 'danger'};
          $scope.$emit('sentMessage', message);
          $scope.working = false;
        }
      );
    };

    $scope.delete = function(user) {
      $modalInstance = $modal.open({
        resolve: {
          element: function(){
            return user;
          }
        },
        scope: $scope,
        controller: 'modalCtrl',
        templateUrl: '../templates/users/deleteUserModal.html'
      });
    };

    $scope.deleteUser = function(user){
      $scope.working_delete = true;
      UsersRes.remove({id: user.id},
        function(data, status){
          index = $scope.users.indexOf(user);
          $scope.users.splice(index, 1);
          $modalInstance.close();
          message = { message: 'USER.DELETE.SUCCESS', type: 'success'};
          $scope.$emit('sentMessage', message);

        }, 
        function(data){
          message = { message: 'USER.DELETE.ERROR', type: 'danger'};
          $scope.$emit('sentMessage', message);
        }
      );
    };

    $scope.reSend = function(user){
      $http({
        url: '/users/confirmation',
        method: 'POST',
        data: { id: user.id, email: user.email }
      }).then(
        function(response){
          message = { message: 'CONFIRM.SUCCESS', type: 'success'};
          $scope.$emit('sentMessage', message);
        },
        function(response){
          message = { message: 'CONFIRM.ERROR', type: 'danger'};
          $scope.$emit('sentMessage', message);
        }
      );
    };

    $scope.cleanForm = function() {
      $scope.user.email = "";
      $scope.user.name  = "";
      $scope.user.last_name = "";
    };
  }
]);