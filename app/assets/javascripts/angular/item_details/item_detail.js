angular.module('conservar.item_detail',[
  'ngResource'
])


.factory( 'ItemDetailRes', function ( $resource )  {
  var res = $resource("/items/:item_id/item_details/:id.json",
    { id:'@id', item_id: '@item_id' },
    { 
      'query':  { method: 'GET', isArray: true},
      'create': { method: 'POST'  },
      'update': { method: 'PATCH' },
      'destroy': { method: 'DELETE', headers: {'Content-Type': 'application/json'}}
    });
  return res;
});


