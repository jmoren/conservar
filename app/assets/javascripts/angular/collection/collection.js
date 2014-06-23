angular.module('conservar.collections',[
  'ui.router.state',
  'ui.router',
  'ngResource',
  'common.pagination'
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

.controller('CollectionsCtrl', function($scope, ItemRes, CollectionRes, $location, $http, $modal, Pagination){
  $scope.collection  = new CollectionRes();
  $scope.selected_collection = null;
  $scope.selected    = false;

  $scope.init = function(){
    $http({
      url: '/collections.json',
      method: 'GET'
    }).then(function(response){
      $scope.collections = response.data;
      // paginations
      $scope.pagination  = Pagination.getNew(10);
      $scope.pagination.numPages = Math.ceil($scope.collections.length/$scope.pagination.perPage);
    });
  };

  $scope.saveCollection = function(collection) {
    $http({
      method: "POST",
      url: "/collections.json",
      data: { collection: collection }
    }).success(function(data, status){
      $scope.collections.push(data.collection);
      $scope.reset_form();
      $modalInstance.close();
      $scope.pagination.numPages = Math.ceil($scope.collections.length/$scope.pagination.perPage);
    }).error(function(data, status){
      console.log(status);
    });
  };

  $scope.updateCollection = function(collection){
    $http({
      method: "PATCH",
      url: "/collections/"+collection.id+".json",
      data: { collection: collection }
    }).success(function(data, status){
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
        $scope.pagination.numPages = Math.ceil($scope.collections.length/$scope.pagination.perPage);
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

  $scope.openModal = function(collection, view, size){
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return collection;
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

  $scope.details =  function(collection){
    $http({
      url: "/collections/"+ collection.id+".json",
      method: "GET"
    }).success(function(data){
      $scope.selected_collection = collection;
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
      'update': { method:'PUT' },
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    });
  return res;
});