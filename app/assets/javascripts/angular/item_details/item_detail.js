angular.module('conservar.item_detail',[
  'ngResource'
])


.factory('ItemDetailRes', ['$resource', function ($resource)  {
  var res = $resource("/items/:item_id/item_details/:id.json",
    { id:'@id', item_id: '@item_id' },
    {
      'update': { method: 'PATCH'}
    });
  return res;
}]);


