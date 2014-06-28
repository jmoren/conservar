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
        templateUrl: '/templates/collections/collections.html'
      }
    }
  });
})

.controller('CollectionsCtrl', function($scope, ItemRes, CollectionRes, $location, $http, $modal){
  $scope.collection  = new CollectionRes();
  $scope.selected_collection = null;
  $scope.selected    = false;

  $scope.init = function(){
    CollectionRes.query(
      function(response){
        $scope.collections = response;
      },
      function(error){
        console.log(error);
      }
    );
  };

  $scope.saveCollection = function(collection) {
    CollectionRes.save({ collection: collection },
      function(data, status){
        $scope.collections.push(data.collection);
        $modalInstance.close();
        $scope.reset_form();
      },
      function(data, status){
        console.log(status);
      }
    );
  };

  $scope.updateCollection = function(collection){
    CollectionRes.update({id: collection.id}, collection,
      function(data, status){
        $modalInstance.close();
      },
        function(data, status){
        console.log(status);
      }
    );
  };

  $scope.remove = function(collection){
    result = confirm("Estas seguro?");
    if(result){
      CollectionRes.remove({id: collection.id }, collection,
        function(data,status){
          index = $scope.collections.indexOf(collection);
          removed = $scope.collections.splice(index, 1);
          if(collection.id === $scope.selected_collection.id){
            $scope.selected = false;
            $scope.selected_collection = undefined;
          }
        },
        function(status, data){
          console.log(status);
        }
      );
    }else{
      console.log("declined");
    }
  };

  $scope.openModal = function(collection, view){
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return collection;
        }
      },
      scope: $scope,
      controller: 'modalCtrl',
      templateUrl: '../templates/collections/collectionFormModal.html'
    });
  };

  $scope.reset_form = function() {
    $scope.collection.name = null;
    $scope.collection.description = null;
  };

  $scope.setSelected =  function(collection){
    CollectionRes.get({ id: collection.id },
      function(data){
        $scope.selected_collection = collection;
        $scope.selected_collection.items = data.items;
        $scope.selected = true;
      },
      function(response){
        console.log(response);
      }
    );
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