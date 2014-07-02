angular.module('conservar.collection',[
  'ui.router.state',
  'ui.router',
  'ui.bootstrap',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'collection', {
    url: '/collections/:id',
    views: {
      "main": {
        controller: 'CollectionCtrl',
        templateUrl: '/templates/collections/collection.html'
      }
    },
    title:'Collection'
  });
})

.controller('CollectionCtrl', function($scope, CollectionRes, ItemsRes, ReportRes, $modal, $stateParams, upload){
  $scope.currentUser = {};
  $scope.selected_item = {};
  $scope.newItem = new ItemsRes();

  $scope.init = function(){
    CollectionRes.get($stateParams,
      function(data){
        $scope.collection = data.collection;
        $scope.items      = data.items;
        $scope.reports    = data.reports;
      },
      function(error){
        console.log("error");      
      }
    );
  };

  $scope.openModalCollection = function(){
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return $scope.collection;
        }
      },
      scope: $scope,
      controller: 'modalCtrl',
      templateUrl: '../templates/collections/collectionFormModal.html'
    });
  };

  $scope.updateCollection = function(collection){
    CollectionRes.update({id: collection.id, collection: collection},
      function(data, status){
        $modalInstance.close();
      }, function(data, status){
        console.log(status);
      }
    );
  };

  $scope.openModalItem = function(myItem, size, view){
    $scope.selected_item = myItem || $scope.newItem;
    
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return $scope.selected_item;
        }
      },
      scope: $scope,
      size: size,
      controller: 'modalCtrl',
      templateUrl: '../templates/items/modalFormItem.html'
    });
  };

  $scope.saveItem = function(item){
    ItemsRes.save({collection_id: $scope.collection.id}, item,
      function (response) {
        $scope.items.push(response.item);
        $scope.reset_item();
        $modalInstance.close();
      },
      function (response) {
        console.log(response);
      }
    );
  };

  $scope.updateItem = function(item){
    ItemsRes.update({collection_id: $scope.collection.id}, item,
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
      ItemsRes.delete({collection_id: $scope.collection.id}, item,
        function(data,status){
          index = $scope.items.indexOf(item);
          $scope.items.splice(index, 1);
        },
        function(status, data){
          console.log(status);
        }
      );
    }else{
      console.log("declined");
    }
  };

  $scope.generateReport = function(){
    
    ReportRes.save({collection_id: $scope.collection.id},
      function(data){
        console.log(data);
      },
      function(error){
        console.log(error);
      }
    );
  };

  $scope.download = function(report){
    ReportRes.get({collection_id: $scope.collection.id, id: report.id},
      function(data){
        console.log(data);
      },
      function(error){
        console.log(error);
      }
    );
  };

  $scope.remove = function(report){
    result = confirm("Estas seguro?");
    if(result){
      ReportRes.remove({collection_id: $scope.collection.id }, report,
        function(data,status){
          index = collections.reports.indexOf(collection);
          collections.reports.splice(index, 1);        },
        function(status, data){
          console.log(status);
        }
      );
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
    { id:'@id', collection_id: '@collection_id' },
    {
      'update': {method: 'PUT'}
    }
  );
  return res;
});