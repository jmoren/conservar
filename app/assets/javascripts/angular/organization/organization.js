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
.controller( 'OrganizationCtrl', ['$scope', '$stateParams', 'UserRes', '$location', '$http',
  function( $scope, $stateParams, UsersRes, $location) {
    $scope.editOrg = false;

    $scope.init = function(){
      $scope.organization = $scope.current_user.organization;
    };

    $scope.save = function(organization){
      $http({
        url: "/organizations/"+ $scope.organization.id+".json",
        method: 'PATCH',
        data: {organization: organization}
      }).then(function(response){
        $scope.organization = response.data;
        $scope.editOrg = false;
      },function(error){
        console.log(error);
      });
    };
  }
])

/**
 * Add a resource to allow us to get at the server
 */
.factory('OrganziationRes', ['$resource', function ($resource) {
  var res = $resource("../organizations/:id.json",
    { id:'@id' },
    {
      'remove' : {method: 'DELETE', isArray: false, headers: {'Content-Type': 'application/json'}}
    });
  return res;
}]);