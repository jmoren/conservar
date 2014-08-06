angular.module('common.search',[
  'ngResource'
]).

controller('searchCtrl', ['$scope', '$http', '$location', 'SearchRes', function($scope, $http, $location, SearchRes){
  $scope.keyword = "";
  $scope.results = [];
  $scope.searching = false;
  $scope.loading   = false;
  $scope.invalidCodes = [91, 18, 37, 38, 39, 40, 27];

  $scope.search = function(event){
    if($scope.keyword.length > 2){
      if($scope.validKey(event)){
        $scope.searching = true;
        $scope.loading   = true;
        SearchRes.query({ q: $scope.keyword }, function(response){
          $scope.loading = false;
          $scope.results = response.items.concat(response.collections);
        });
      }
    }else{
      $scope.results = [];
      $scope.searching = false;
    }
  };

  $scope.validKey = function(event){
    return (($scope.invalidCodes.indexOf(event.keyCode) == -1) && !event.altKey && !event.ctrlKey);
  };

  $scope.clear = function(){
    $scope.searching = false;
    $scope.loading   = false;
    $scope.keyword = "";
    $scope.results = [];
  };

  $scope.goTo = function(location){
    $scope.clear();
    $location.path(location);
  };
}]).

factory('SearchRes', ['$resource', function($resource){
  var res = $resource("../search.json",
    { id: null },
    {
      'query': { method: 'GET', isArray: false }
    });
  return res;
}]);