angular.module('conservar.item',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'item', {
    url: '/item/:id',
    views: {
      "main": {
        controller: 'ItemCtrl',
        templateUrl: '/templates/item.html'
      }
    }
  });
})

.controller('ItemCtrl', function($scope, ItemRes, $stateParams, $http){
  $scope.currentUser = {};

  $scope.init = function(){
    ItemRes.get($stateParams,
      function(data){
        $scope.collection = data.collection;
        $scope.item = data.item;
      },
      function(error){
        console.log("error");      
      }
    );
  };
})

.factory( 'ItemRes', function ( $resource )  {
  var res = $resource("/items/:id.json",
    { id:'@id' },
    {
      'update': { method:'PUT' },
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    });
  return res;
});


