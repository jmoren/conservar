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

.run(function ($rootScope,   $state,   $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ui-sref-active="active }"> will set the <li> // to active whenever
    // 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    }
  );