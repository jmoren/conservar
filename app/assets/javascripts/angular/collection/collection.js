angular.module('conservar.collection',[
  'ui.router.state',
  'ui.router',
  'ui.bootstrap',
  'ngResource'
])

.config(['$stateProvider', 
  function( $stateProvider ){
    $stateProvider.state( 'collection', {
      url: '/collections/:id',
      views: {
        "main": {
          controller: 'CollectionCtrl',
          templateUrl: '/templates/collections/collection.html'
        }
      },
      title:'OBJECT.SING'
    });
  }
])

.controller('CollectionCtrl', ['$scope','CollectionRes', 'ItemsRes', 'ReportRes', '$modal','$stateParams', 'upload', 
  function($scope, CollectionRes, ItemsRes, ReportRes, $modal, $stateParams, upload){
    $scope.loading = true;
    $scope.currentUser = {};
    $scope.selected_item = {};
    $scope.newItem = new ItemsRes();
    $scope.format = 'dd/MM/yyyy';

    $scope.init = function(){
      CollectionRes.get($stateParams,
        function(data){
          $scope.collection = data.collection;
          $scope.items      = data.items;
          $scope.reports    = data.reports;
          $scope.loading    = false;
        },
        function(error){
          message = { message: 'Error cargando el objeto', type: 'danger'};
          $scope.$emit('sentMessage', message);
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
          message = { message: 'Se actualizo el objeto', type: 'success'};
          $scope.$emit('sentMessage', message);
        }, function(data, status){
          message = { message: 'Error actualizando el objeto', type: 'danger'};
          $scope.$emit('sentMessage', message);
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

          message = { message: 'Se creo con exito la nueva pieza', type: 'success'};
          $scope.$emit('sentMessage', message);
        },
        function (response) {
          message = { message: 'No se pudo guardar la pieza', type: 'success'};
          $scope.$emit('sentMessage', message);
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

            message = { message: 'Se elimino con exito la pieza', type: 'success'};
            $scope.$emit('sentMessage', message);
          },
          function(status, data){
            message = { message: 'No se pudo eliminar la pieza', type: 'success'};
            $scope.$emit('sentMessage', message);
          }
        );
      }
    };

    $scope.generateReport = function(){
      $modalInstance = $modal.open({
        scope: $scope,
        templateUrl: '../templates/reports/reportModal.html'
      });
    };

    $scope.createReport = function(){
      ReportRes.save({collection_id: $scope.collection.id},
        function(data){
          $scope.reports.push(data);
          $modalInstance.close();
        },
        function(error){
          console.log(error);
          $modalInstance.close();
        }
      );
    };

    $scope.removeReport = function(report){
      result = confirm("Estas seguro?");
      if(result){
        ReportRes.remove({collection_id: $scope.collection.id }, report,
          function(response){
            index = $scope.reports.indexOf(report);
            $scope.reports.splice(index, 1);        },
          function(error){
            console.log(error);
          }
        );
      }
    };

    $scope.reset_item = function(){
      $scope.newItem.name = "";
      $scope.newItem.description = "";
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

    $scope.close = function(){
      $modalInstance.close();
    };
  }
])

.factory('ItemsRes', ['$resource', 
  function ( $resource )  {
    var res = $resource("/collections/:collection_id/items/:id.json",
      { id:'@id', collection_id: '@collection_id' },
      {
        'update': {method: 'PUT'}
      }
    );
    return res;
  }
]);
