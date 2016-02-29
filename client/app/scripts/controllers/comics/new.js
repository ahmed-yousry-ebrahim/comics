'use strict';

/**
 * @ngdoc function
 * @name comicsApp.controller:ComicsNewCtrl
 * @description
 * # ComicsNewCtrl
 * Controller of the comicsApp
 */
angular.module('comicsApp')
  .controller('ComicsNewCtrl', ['$detection',function ($detection) {
  	var ComicsNewCtrl = this;
    ComicsNewCtrl.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    ComicsNewCtrl.userAgent = $detection.getUserAgent();
    ComicsNewCtrl.isAndroid = $detection.isAndroid();
  }]);
