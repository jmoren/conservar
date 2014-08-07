 /*
 * Authentication module, redirects to login if not logged in
 */

angular.module('common.authentication', [])

.config(['$httpProvider', function($httpProvider){
  var interceptor = ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
    return {
      responseError: function(rejection) {
        if (rejection.status == 401) {
          console.log("Unauthorized user");
          $rootScope.$broadcast('event:unauthorized');
          $location.path('/login');
          console.log($location.path());
          return rejection;
        }
        return $q.reject(rejection);
      }
    };
  }];
  $httpProvider.interceptors.push(interceptor);
}]);