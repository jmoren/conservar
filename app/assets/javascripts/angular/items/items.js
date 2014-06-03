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

  $scope.openModal = function(myItem, size, view){
    template = "";
    $scope.selected_item = myItem;
    if(view === "show"){
      template = '../templates/modalShowItem.html';
    }else{
      template = '../templates/modalFormItem.html';
    }

    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return $scope.selected_item;
        }
      },
      scope: $scope,
      size: size,
      controller: 'modalCtrl',
      templateUrl: template
    });
  };

  $scope.saveItem = function(item){
    $http({
      url: "/collections/"+$scope.collection.id+"/items.json",
      method: "POST",
      data: { item: item }
    }).then(
      function(response, status){
        $scope.items.push(response.data.item);
        $scope.reset_item();
        $modalInstance.close();
      },
      function(data, status){
        console.log(status);
      }
    );
  };

  $scope.saveItem = function(item){
    $http({
      url: "/collections/"+$scope.collection.id+"/items/"+item.id+".json",
      method: "PATCH",
      data: { item: item }
    }).then(
      function(response, status){
        $modalInstance.close();
      },
      function(data, status){
        console.log(status);
      }
    );
  };
  $scope.remove = function(item){
    result = confirm("Estas seguro?");
    if(result){
      $http({
        method: "DELETE",
        url: "/collections/"+$scope.collection.id+"/items/"+item.id+".json"
      })
      .success(function(data,status){
        index = $scope.items.indexOf(item);
        $scope.items.splice(index, 1);
      })
      .error(function(status, data){
        console.log(status);
      });
    }else{
      console.log("declined");
    }
  };

  $scope.reset_item = function(){
    $scope.newItem.name = "";
    $scope.newItem.description = "";
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