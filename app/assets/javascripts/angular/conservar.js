angular.module('conservar',[
  'ui.router',
  'common.modal',
  'conservar.item',
  'conservar.items',
  'conservar.collections',
  'conservar.dashboard'
  ])

.config( function ConservarConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.run( function run () {});