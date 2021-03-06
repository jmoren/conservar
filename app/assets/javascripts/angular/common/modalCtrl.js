angular.module('common.modal',[])

.controller('modalCtrl', ['$scope', '$modalInstance', 'element', function($scope, $modalInstance, element){
  $scope.element = element;

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);