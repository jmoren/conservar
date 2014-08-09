angular.module('conservar.image',[
  'ui.router.state',
  'ui.router',
  'ngResource'
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider.state( 'singleImage', {
    url: '/treatments/:treatment_id/images/:id',
    views: {
      "main": {
        controller: 'ImageCtrl',
        templateUrl: '/templates/images/image.html'
      }
    },
    title:'Image'
  });
}])

.controller('ImageCtrl', ['$scope', '$location', '$stateParams', 'ImageRes',
  function($scope, $location, $stateParams, ImageRes){
    $scope.alert = { type: "", message: "" };
    $scope.updateImage = false;

    $scope.init = function(){
      ImageRes.get($stateParams,
        function(data){
          $scope.image = data.image;
        },
        function(error){
          console.log("error");      
        }
      );
    };

    $scope.update = function(image){
      ImageRes.update({treatment_id: image.treatment.id}, image, 
        function(data){
          $scope.updateImage = false;
        },
        function(error){
          console.log(error);
        }
      );
    };

    $scope.remove = function(image){
      res = confirm("Estas seguro?");
      if(res){
        ImageRes.remove({treatment_id: image.treatment.id}, image, 
          function(data){
            location = "#/items/"+image.item.id+"/treatments/" + image.treatment.id;
            $location.path(location);
        
          },
          function(error){
            console.log(error);
          }
        );
      }
    };

    $scope.addAlert = function(type, message){
      $scope.alert = {type: type, message: message};
    };

    $scope.closeAlert = function(index) {
      $scope.alert.type = "";
      $scope.alert.message = "";
    };

    $scope.$on('$locationChangeStart', function(event) {
      console.log(event);
      if(!confirm("Are you sure you want to leave this page?")) {
        event.preventDefault();
      }
    });
  }
])

.directive('ngElevateZoom', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      attrs.$observe('zoomImage',function(){
        linkElevateZoom();
      });

      function linkElevateZoom(){
        if (!attrs.zoomImage) return;        
        element.attr('data-zoom-image',attrs.zoomImage);
        $(element).elevateZoom({zoomType  : "lens", lensShape : "round", lensSize : 200});
      }
      
      linkElevateZoom();
    }
  };
})

.factory('ImageRes',['$resource', function($resource){
  var res = $resource("/treatments/:treatment_id/images/:id.json",
    { id:'@id', treatment_id: '@treatment_id' },
    { 
      'update': { method: 'PATCH' }
    });
  return res;
}]);