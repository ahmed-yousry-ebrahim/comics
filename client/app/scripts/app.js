'use strict';

/**
 * @ngdoc overview
 * @name comicsApp
 * @description
 * # comicsApp
 *
 * Main module of the application.
 */
angular
  .module('comicsApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'adaptive.detection',
    'naif.base64',
    'angular-loading-bar',
    'contenteditable'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/comics/new'
      })
      .when('/comics/new', {
        templateUrl: 'views/comics/new.html',
        controller: 'ComicsNewCtrl',
        controllerAs: 'ComicsNewCtrl'
      })
      .when('/comics/index', {
        templateUrl: 'views/comics/index.html',
        controller: 'ComicsIndexCtrl',
        controllerAs: 'ComicsIndexCtrl'
      })
      .when('/comics/show/:comicId', {
        templateUrl: 'views/comics/show.html',
        controller: 'ComicsShowCtrl',
        controllerAs: 'ComicsShowCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Comic', ['$resource', function($resource) {
  return $resource('/api/comics/:id.json', null, {
    'update': { method:'PUT' }
  });
  }])
  .factory('Stripe', ['$resource', function($resource) {
  return $resource('/api/comics/:comicId/stripes/:id.json', {comicId:'@comicId'}, {
    'update': { method:'PUT' }
  });
  }]);
