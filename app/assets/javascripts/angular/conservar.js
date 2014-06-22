angular.module('conservar',[
  'ui.router',
  'ngWYSIWYG',
  'underscore.string',
  'ngSanitize',
  'common.modal',
  'common.pagination',
  'conservar.item_detail',
  'conservar.item',
  'conservar.items',
  'conservar.treatment',
  'conservar.collections',
  'conservar.dashboard'
  ])

.config( function ConservarConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/dashboard' );
})

.run( function run () {});