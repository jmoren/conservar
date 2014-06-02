angular.module('conservar.collections',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'collections', {
    url: '/collections',
    views: {
      "main": {
        controller: 'CollectionsCtrl',
        templateUrl: '/templates/collections.html'
      }
    }
  });
})

.controller('CollectionsCtrl', function($scope, ItemRes, CollectionRes, $location, $http, $modal){
  $scope.currentUser = {};
  $scope.collection  = new CollectionRes();
  $scope.collections = CollectionRes.query();
  $scope.selected_collection = null;
  $scope.selected    = false;

  $scope.saveCollection = function(collection) {
    $http({
      method: "POST",
      url: "/collections.json",
      data: { collection: $scope.collection }
    }).success(function(data, status){
      $scope.collections.push(data.collection);
      $scope.reset_form();
      $modalInstance.close();
    }).error(function(data, status){
      console.log(status);
    });
  };

  $scope.remove = function(collection){
    toRemove = false;
    if(($scope.selected !== undefined) && collection.id == $scope.selected.id){
      toRemove = true;
    }

    result = confirm("Estas seguro?");
    if(result){
      $http({
        method: "DELETE",
        url: "/collections/"+collection.id+".json"
      })
      .success(function(data,status){
        index = $scope.collections.indexOf(collection);
        $scope.collections.splice(index, 1);
        console.log(toRemove);
        if(toRemove){
          $scope.selected = false;
          $scope.selected_collection = null;
        }
      })
      .error(function(status, data){
        console.log(status);
      });
    }else{
      console.log("declined");
    }
  };

  $scope.newCollection = function(){
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return $scope.collection;
        }
      },
      scope: $scope,
      size: 'md',
      controller: 'modalCtrl',
      templateUrl: '../templates/collectionFormModal.html'
    });
  };

  $scope.reset_form = function() {
    $scope.collection.name = null;
    $scope.collection.description = null;
  };

  $scope.details =  function(collectionId){
    $http({
      url: "/collections/"+ collectionId+".json",
      method: "GET"
    }).success(function(data){
      $scope.selected_collection = data.collection;
      $scope.selected_collection.items = data.items;
      $scope.selected = true;
    }).error(function(response){
      console.log(response);
    });
  };

  $scope.open = function(collection){
    $location.path('/collections/'+collection.id+"/items");
  };

  $scope.close_selected = function(){
    $scope.selected = undefined;
  };

})

.factory( 'CollectionRes', function ( $resource )  {
  var res = $resource("/collections/:id.json",
    { id:'@id' },
    {
      'get': { method: 'GET'},
      'query': { method: 'GET', isArray: true },
      'update': { method:'PUT' },
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    });
  return res;
});