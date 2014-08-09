angular.module('conservar.collections',[
  'ui.router.state',
  'ui.router',
  'ngResource',
  'common.pagination'
])

.config(['$stateProvider',
 function( $stateProvider ){
    $stateProvider.state( 'collections', {
      url: '/collections',
      views: {
        "main": {
          controller: 'CollectionsCtrl',
          templateUrl: '/templates/collections/collections.html'
        }
      },
      title:'Collections'
    });
  }
])

.controller('CollectionsCtrl', ['$scope', 'ItemRes', 'CollectionRes', '$location', '$http', '$modal',
  function($scope, ItemRes, CollectionRes, $location, $http, $modal){
    $scope.loading = true;
    $scope.collection  = new CollectionRes();
    $scope.selected_collection = null;
    $scope.selected    = false;
    $scope.format = 'dd-MM-yyyy';
    $scope.opened = false;

    $scope.init = function(){
      CollectionRes.query(
        function(response){
          $scope.collections = response;
          $scope.loading    = false;
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

    $scope.openModal = function(collection){
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

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'dd/MM/yyyy',
      startingDay: 1,
      showWeeks: false
    };

    $scope.cancel = function () {
      $scope.opened = false;
      $modalInstance.dismiss('cancel');
    };
  }
])

.factory('CollectionRes',['$resource', 
  function ( $resource )  {
    var res = $resource("/collections/:id.json",
      { id:'@id' },
      {
        'update': { method:'PUT' },
        'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'}},
        'getReport': {method: 'POST'}
      });
    return res;
  }
]);