'use strict';

/**
 * @ngdoc overview
 * @name comicsAppApp
 * @description
 * # comicsAppApp
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
    'adaptive.detection'
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
      .otherwise({
        redirectTo: '/'
      });
  });
