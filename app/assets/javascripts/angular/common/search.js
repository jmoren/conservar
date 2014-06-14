angular.module('common.search',[
  'ngResource'
]).

directive('clearWithEsc', function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, element, attrs, controller) {
      element.on('keydown', function(ev) {
        if (ev.keyCode != 27) 
          return;        
        scope.clear();
      });
    },
  };
}).

controller('searchCtrl', function($scope, $http, $location, SearchRes){
  $scope.keyword = "";
  $scope.results = [];
  $scope.searching = false;
  $scope.loading   = false;
  $scope.invalidCodes = [91, 18, 37, 38, 39, 40];

  $scope.search = function(event){
    if($scope.keyword.length > 2){
      if($scope.validKey(event)){
        $scope.searching = true;
        $scope.loading   = true;
        SearchRes.query({ q: $scope.keyword }, function(response){
          $scope.loading = false;
          $scope.results = response.users.concat(response.doorbots);
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
}).

factory('SearchRes', function($resource){
  var res = $resource("../search.json",
    { id: null },
    {
      'query': { method: 'GET', isArray: false }
    });
  return res;
});