 /*
 * Authentication module, redirects to login if not logged in
 */

angular.module('common.authentication', [])

.config(['$httpProvider', function($httpProvider){
  var interceptor = ['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
    return {
      responseError: function(rejection) {
        if (rejection.status == 401) {
          $rootScope.$broadcast('event:unauthorized');
          $location.path('/login');
          return rejection;
        }
        return $q.reject(rejection);
      }
    };
  }];
  $httpProvider.interceptors.push(interceptor);
}]);