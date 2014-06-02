angular.module('conservar.items',[
  'ui.router.state',
  'ui.router',
  'ui.bootstrap',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'items', {
    url: '/collections/:collection_id/items',
    views: {
      "main": {
        controller: 'ItemsCtrl',
        templateUrl: '/templates/items.html'
      }
    }
  });
})

.controller('ItemsCtrl', function($scope,CollectionRes, ItemsRes, $modal, $stateParams, $http){
  $scope.currentUser = {};
  $scope.selected_item = {};
  $scope.newItem = new ItemsRes();

  $scope.init = function(){
    ItemsRes.query($stateParams,
      function(data){
        $scope.collection = data.collection;
        $scope.items = data.items;
      },
      function(error){
        console.log("error");      
      }
    );
  };

  $scope.openModal = function(myItem){
    $scope.selected_item = myItem;
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return $scope.selected_item;
        }
      },
      scope: $scope,
      size: 'lg',
      controller: 'modalCtrl',
      templateUrl: '../templates/modalItem.html'
    });
  };

  $scope.saveItem = function(item){
    $http({
      url: "/collections/"+$scope.collection.id+"/items.json",
      method: "POST",
      data: { item: item }
    }).then(
      function(response, status){
        console.log(response.data);
        $scope.items.push(response.data.item);
        $scope.reset_form();
      },
      function(data, status){
        console.log(status);
      }
    );
  };

  $scope.reset_form = function() {
    $scope.newItem.name = null;
    $scope.newItem.description = null;
  };
})

.factory( 'ItemsRes', function ( $resource )  {
  var res = $resource("/collections/:collection_id/items/:id.json",
    { id:'@id' },
    {
      'query': { method: 'GET', isArray: false }
    });
  return res;
});