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
    url: '/organization/:id',
    views: {
      "main": {
        controller: 'OrganizationCtrl',
        templateUrl: '../templates/organizations/organization.html'
      }
    },
    title: "Organization"
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'OrganizationCtrl', ['$scope', '$stateParams', '$location', '$http', 'OrganizationRes',
  function( $scope, $stateParams, $location, $http, OrganizationRes) {
    $scope.editOrg = false;

    $scope.init = function(){
      OrganizationRes.get($stateParams, 
        function(data){
          console.log(data);
          $scope.organization = data;
        },
        function(error){
          console.log(error);
        }
      );
    };

    $scope.save = function(organization){
      OrganizationRes.update({ id: organization.id}, organization,
        function(response){
          $scope.organization = response.data;
          $scope.editOrg = false;
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
.factory('OrganizationRes', ['$resource', function ($resource) {
  var res = $resource("../organizations/:id.json",
    { id:'@id' },
    {
      'remove' : { method: 'DELETE', isArray: false, headers: {'Content-Type': 'application/json'} }
    });
  return res;
}]);