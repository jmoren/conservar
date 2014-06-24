angular.module('conservar.item',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])

.config( function( $stateProvider ){
  $stateProvider.state( 'item', {
    url: '/items/:id',
    views: {
      "main": {
        controller: 'ItemCtrl',
        templateUrl: '/templates/items/item.html'
      }
    }
  });
})

.controller('ItemCtrl', function($scope, $stateParams, $http, $modal, ItemRes, ItemDetailRes, TreatmentRes){
  // alert
  $scope.alert = { type: "", message: "" };

  $scope.types = {
    medidas: ["alto", "ancho", "diagonal", "profundo", "largo"],
    materiales: ["madera", "plastico", "cuero", "vidrio", "metal"],
  };

  $scope.init = function(){
    $scope.setItem();
  };

  $scope.setItem = function(){
    ItemRes.get($stateParams,
      function(data){
        $scope.collection      = data.collection;
        $scope.item            = data.item;
      },
      function(error){
        console.log("error");      
      }
    );
  };

  $scope.updateItem = function(item){
    ItemRes.update({}, item, function(){
      $modalInstance.close();
    });
  };

  $scope.openModalItem = function(myItem){
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return myItem;
        }
      },
      scope: $scope,
      controller: 'modalCtrl',
      templateUrl: '../templates/items/modalFormItem.html'
    });
  };

  $scope.openDetailModal = function(detail, type){
    current_detail = detail || new ItemDetailRes();
    current_detail.detail_type = type;
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return current_detail;
        }
      },
      scope: $scope,
      controller: 'modalCtrl',
      templateUrl: "../templates/details/modalDetailForm"
    });
  };

  $scope.openTreatmentModal = function(treatment){
    current = treatment || new TreatmentRes();
    $modalInstance = $modal.open({
      resolve: {
        element: function(){
          return current;
        }
      },
      scope: $scope,
      size: 'lg',
      controller: 'modalCtrl',
      templateUrl: "../templates/treatments/modalTreatmentForm.html"
    });
  };

  $scope.saveTreatment = function(treatment){
    treatment.$save({item_id: $scope.item.id},
      function(data){
        $scope.item.treatments.collection.push(data.treatment);
        $scope.item.treatments.current = data.treatment.id;
        $scope.item.treatments.open = true;
        $scope.addAlert("success", "Se guardo con exito");
        $modalInstance.close();
      },
      function(data){
        $scope.addAlert("danger", "No pudo guardarse, intente nuevamente");
      }
    );
  };

  $scope.updateTreatment = function(treatment){
    TreatmentRes.update({item_id: $scope.item.id}, treatment,
      function(data){
        $scope.addAlert("success", "Se actualizo con exito");
        $modalInstance.close();
      },
      function(data){
        $scope.addAlert("danger", "No pudo actualizarse, intente nuevamente");
      }
    );    
  };
  $scope.deleteTreatment = function(treatment){
    TreatmentRes.remove({item_id: $scope.item.id}, treatment,
      function(data){
        index = $scope.item.treatments.collection.indexOf(treatment);
        $scope.item.treatments.collection.splice(index,1);
        $scope.item.treatments.open = false;
        $scope.addAlert("success", "Se elimino con exito");
        $modalInstance.close();
      },
      function(data){
        $scope.addAlert("danger", "No pudo eliminarse, intente nuevamente");
      }
    );    
  };
  $scope.saveDetail = function(detail){
    detail.$save({item_id: $scope.item.id},
      function(data){
        if(data.detail_type == 'materiales')
          $scope.item.materials.push(data);
        if(data.detail_type == 'medidas')
          $scope.item.medidas.push(data); 
        $modalInstance.close();
        $scope.addAlert("success", "Se guardo con exito!");
      },
      function(data){
        $scope.addAlert("danger", "No pudo guardarse, intente nuevamente");
      }
    );
  };

  $scope.updateDetail = function(detail){
    ItemDetailRes.update({item_id: $scope.item.id},detail,
      function(data){
        $modalInstance.close();
        $scope.addAlert("success", "Se actualizo con exito!");
      },
      function(data){
        $scope.addAlert("danger", "No pudo actualizarse, intente nuevamente");
      }
    );
      
  };

  $scope.deleteDetail = function(detail){
    ItemDetailRes.remove({item_id: $scope.item.id}, detail,
      function(){
        if(detail.detail_type == 'materiales'){
          index = $scope.item.materials.indexOf(detail);
          $scope.item.materials.splice(index,1);
        }
        if(detail.detail_type == 'medidas'){
          index = $scope.item.medidas.indexOf(detail);
          $scope.item.medidas.splice(index,1);
        }

        $scope.addAlert("success", "Se elimino con exito!");
      },
      function(data){
        $scope.addAlert("danger", "No pudo eliminarse, intente nuevamente");
      }
    );
  };

  $scope.openTreatment = function(treatment){
    response = confirm("Estas seguro de reabrir el tratamiento?");
    if(response){
      $http({
        url: '/items/'+$scope.item.id+'/treatments/'+treatment.id+'/open.json',
        method: 'POST',
        data: {id: treatment.id, item_id: $scope.item.id}
      }).then(function(data){
        treatment.closed = false;
        $scope.item.treatments.open = treatment;
      }, function(data){
        console.log("error");
      });
    }
  };

  $scope.closeTreatment = function(treatment){
    response = confirm("Estas seguro de cerrar el tratamiento?");
    if(response){
      $http({
        url: '/items/'+$scope.item.id+'/treatments/'+treatment.id+'/close.json',
        method: 'POST',
        data: {id: treatment.id, item_id: $scope.item.id}
      }).then(function(result){
        treatment.closed = true;
        $scope.item.treatments.open = undefined;
      }, function(data){
        console.log("error");
      });
    }
  };

  $scope.goTo = function(elem){
    $location.path(elem.id);
  };

  $scope.addAlert = function(type, message){
    $scope.alert = {type: type, message: message};
  };

  $scope.closeAlert = function(index) {
    $scope.alert.type = "";
    $scope.alert.message = "";
  };

})

.factory( 'ItemRes', function ( $resource )  {
  var res = $resource("/items/:id.json",
    { id:'@id' },
    { 
      'update': { method: 'PUT'},
      'remove': { method: 'DELETE', headers: {'Content-Type': 'application/json'} },
     }
  );
  return res;
});


