'use strict';

/**
 * @ngdoc function
 * @name comicsApp.controller:ComicsShowCtrl
 * @description
 * # ComicsShowCtrl
 * Controller of the comicsApp
 */
angular.module('comicsApp')
  .controller('ComicsShowCtrl', ["$routeParams", "Comic" ,function ($routeParams, Comic) {
    var ComicsShowCtrl = this;
    ComicsShowCtrl.stripes = [];

    ComicsShowCtrl.init = function(){
    	var comic = Comic.get({ id: $routeParams.comicId }, function(response) {
          ComicsShowCtrl.stripes = response.stripes;
          
        },
        function(errorResponse){
          console.log(errorResponse);
        });
    };

    ComicsShowCtrl.init();
  }]);
