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

.controller('ItemCtrl', function($scope, ItemRes, $stateParams, $http, $modal, ItemDetailRes){
  $scope.current_details = {};
  $scope.item_details = {};

  $scope.types = {
    medidas: ["alto", "ancho", "diagonal", "profundo", "largo"],
    materiales: ["madera", "plastico", "cuero", "vidrio", "metal"],
  };

  $scope.init = function(){
    ItemRes.get($stateParams,
      function(data){
        $scope.collection = data.collection;
        $scope.item = data.item;
        $scope.item_details = ItemDetailRes.query({item_id: $scope.item.id});
      },
      function(error){
        console.log("error");      
      }
    );
  };

  $scope.openDetailModal = function(detail, type){
    $scope.current_detail = detail || new ItemDetailRes();
    $scope.current_detail.detail_type = type;
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return $scope.current_detail;
        }
      },
      scope: $scope,
      size: 'md',
      controller: 'modalCtrl',
      templateUrl: "../templates/modalDetailForm"
    });
  };

  $scope.saveDetail = function(detail){
    detail.$create({item_id: $scope.item.id}).then(
      function(data){
        console.log(data);
        $scope.item_details.push(data);
        $modalInstance.close();
      },
      function(data){
        console.log("error adding detail");
      }
    );
  };

  $scope.updateDetail = function(detail){
    console.log(detail);
    detail.$update({item_id: $scope.item.id}).then(
      function(data){
        $modalInstance.close();
      },
      function(data){
        console.log("error updating detail");
      }
    );
      
  };

  $scope.deleteDetail = function(detail){
    $http({
      url: '/items/'+$scope.item.id+"/item_details/"+detail.id+".json",
      method: 'DELETE',
    }).success(function(data){
      index = $scope.item_details.indexOf(detail);
      $scope.item_details.splice(index,1);
    }).error(function(data){
      console.log("error updating detail");
    });
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


