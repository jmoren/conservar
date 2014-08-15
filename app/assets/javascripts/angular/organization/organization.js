/**
 * User module
 */
angular.module( 'conservar.organization', [
  'ui.router.state',
  'ui.router',
  'ngResource'
])

/**
 * Define the route that this module relates to, and the page template and controller that is tied to that route
 */
.config(['$stateProvider', function config( $stateProvider ) {
  $stateProvider.state( 'organization', {
    url: '/organization',
    views: {
      "main": {
        controller: 'OrganizationCtrl',
        templateUrl: '../templates/organizations/organization.html'
      }
    },
    title: "ORGANIZATION.SING"
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'OrganizationCtrl', ['$rootScope', '$scope', '$stateParams', '$location', '$http', 'OrganizationRes',
  function($rootScope, $scope, $stateParams, $location, $http, OrganizationRes) {
    $scope.editOrg = false;
    $scope.loading = false;
    $scope.working = false;

    $scope.init = function(){
      OrganizationRes.query(
        function(data){
          $scope.organization = data;
          $scope.loading = false;
        },
        function(error){
          message = { message: 'ORGANIZATION.LOADING.ERROR', type: 'success'};
          $scope.$emit('sentMessage', message);
        }
      );
    };

    $scope.save = function(organization){
      $scope.working = true;
      OrganizationRes.update({ id: organization.id}, organization,
        function(response){
          $scope.organization = response;
          $scope.editOrg = false;
          $scope.working = false;
          message = { message: 'ORGANIZATION.UPDATE.SUCCESS', type: 'success'};
          $scope.$emit('sentMessage', message);
        },
        function(error){
          message = { message: 'ORGANIZATION.UPDATE.ERROR', type: 'danger'};
          $scope.$emit('sentMessage', message);
          $scope.working = false;
        }
      );
    };
  }
])

/**
 * Add a resource to allow us to get at the server
 */
.factory('OrganizationRes', ['$resource', function ($resource) {
  var res = $resource("../organizations/:id.json",
    { id:'@id' },
    {
      'query': { method: 'GET', isArray: false},
      'update': { method: 'PATCH'},
      'remove' : { method: 'DELETE', isArray: false, headers: {'Content-Type': 'application/json'} }
    });
  return res;
}]);