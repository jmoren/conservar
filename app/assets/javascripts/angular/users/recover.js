angular.module('conservar.recover', [
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'recover', {
    url: '/users/recover',
    views: {
      "body": {
        controller: 'RecoverCtrl',
        templateUrl: '/templates/users/recover.html'
      }
    },
    className: 'signin-panel'
  });
}])
.controller('RecoverCtrl', ['$scope', '$http', '$location', '$stateParams', '$translate',
  function($scope, $http, $location, $stateParams, $translate) {
    $scope.lang = 'es';
    $scope.showAlert = false;
    $scope.email = "";

    $scope.init = function(){
      $translate.use($scope.lang);
    };

    $scope.changeLang  = function(key){
      $scope.lang = key;
      $translate.use($scope.lang);
    };

    $scope.recover = function(){
      $http({
        url: '/users/password',
        dataType: 'JSON',
        method: 'POST',
        data: { user: { email: $scope.email } }
      }).then(
        function(response){
          console.log(response);
          $scope.showAlert = {type: 'alert-success', message: "RECOVER.SUCCESS" };
          $scope.email = "";
        }, function(error){
          $scope.showAlert = {type: 'alert-danger', message: "RECOVER.ERROR" };
        }
      );
    };
  }
]);