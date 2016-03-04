'use strict';

/**
 * @ngdoc function
 * @name comicsApp.controller:ComicsNewCtrl
 * @description
 * # ComicsNewCtrl
 * Controller of the comicsApp
 */
angular.module('comicsApp')
  .controller('ComicsNewCtrl', ['$detection',"Comic", "Stripe","$location",function ($detection, Comic, Stripe, $location) {
  	var ComicsNewCtrl = this;
    
    ComicsNewCtrl.userAgent = $detection.getUserAgent();
    ComicsNewCtrl.isMobile = $detection.isAndroid() || $detection.isiOS();
    ComicsNewCtrl.comicId = 0;
    ComicsNewCtrl.hasErrors = false;
    ComicsNewCtrl.errors = [];
    ComicsNewCtrl.uploadedImage = {
    	"filename" : "No file selected"
    };
    ComicsNewCtrl.stripes = [];

    ComicsNewCtrl.createStripe = function(){
      ComicsNewCtrl.hasErrors = false;
      var stripe = new Stripe();
          stripe.stripe = {
            "caption": "",
            "image": {
              "data": "data:" + ComicsNewCtrl.uploadedImage.filetype + ";base64,"+ComicsNewCtrl.uploadedImage.base64,
              "content_type": ComicsNewCtrl.uploadedImage.filetype,
              "filename": ComicsNewCtrl.uploadedImage.filename
            }
          };
        stripe.$save({comicId: ComicsNewCtrl.comicId}, function(response) {
          ComicsNewCtrl.stripes.push(response)
          ComicsNewCtrl.uploadedImage = {
            "filename" : "No file selected"
          };
        },
        function(errorResponse){
          ComicsNewCtrl.uploadedImage = {
            "filename" : "No file selected"
          };
          ComicsNewCtrl.hasErrors = true;
          ComicsNewCtrl.errors = [];
          ComicsNewCtrl.errors = errorResponse.data.errors;
        });
    };

    ComicsNewCtrl.upload = function(){
      ComicsNewCtrl.hasErrors = false;
      if(ComicsNewCtrl.uploadedImage.base64 != null){        
      	if(ComicsNewCtrl.comicId == 0){
      		var comic = new Comic();
      		comic.comic = {"is_published" : false};
      		Comic.save(comic, function(response) {
  				  ComicsNewCtrl.comicId = response.id;
            ComicsNewCtrl.createStripe();
    			},
    			function(errorResponse){
    				ComicsNewCtrl.hasErrors = true;
            ComicsNewCtrl.errors = [];
            ComicsNewCtrl.errors = errorResponse.data.errors;
    			}
    			); 
    	}else{
        ComicsNewCtrl.createStripe();
      }
    }else{
      ComicsNewCtrl.hasErrors = true;
      ComicsNewCtrl.errors = [];
      ComicsNewCtrl.errors.push("You must select a file");
    }
    };

    ComicsNewCtrl.updateCaption = function(stripe){
      var updatedStripe = new Stripe();
      updatedStripe.stripe={
        "id": stripe.id,
        "caption": stripe.caption
      };
      updatedStripe.$update({comicId: ComicsNewCtrl.comicId, id: stripe.id}, function(response) {
          
        },
        function(errorResponse){
          ComicsNewCtrl.hasErrors = true;
          ComicsNewCtrl.errors = [];
          ComicsNewCtrl.errors = errorResponse.data.errors;
        });
      };

    ComicsNewCtrl.updateOrder = function(stripeId, newOrder){
      var updatedStripe = new Stripe();
      updatedStripe.stripe={
        "id": stripeId,
        "order": newOrder
      };
      updatedStripe.$update({comicId: ComicsNewCtrl.comicId, id: stripeId}, function(response) {
          ComicsNewCtrl.updateComicData();
        },
        function(errorResponse){
          ComicsNewCtrl.hasErrors = true;
          ComicsNewCtrl.errors = [];
          ComicsNewCtrl.errors = errorResponse.data.errors;
        });
      };

      ComicsNewCtrl.deleteStripe = function(stripe){
       
      Stripe.delete({comicId: ComicsNewCtrl.comicId, id: stripe.id}, function(response) {
          ComicsNewCtrl.updateComicData();
        },
        function(errorResponse){
          ComicsNewCtrl.hasErrors = true;
          ComicsNewCtrl.errors = [];
          ComicsNewCtrl.errors = errorResponse.data.errors;
        });
      };

      ComicsNewCtrl.updateComicData = function(){
        var comic = Comic.get({ id: ComicsNewCtrl.comicId }, function(response) {
          ComicsNewCtrl.stripes = response.stripes;
        },
        function(errorResponse){
          ComicsNewCtrl.hasErrors = true;
          ComicsNewCtrl.errors = [];
          ComicsNewCtrl.errors = errorResponse.data.errors;
        });
      };

      ComicsNewCtrl.publish = function(){
        var updatedComic = new Comic();
        updatedComic.comic={
          "id": ComicsNewCtrl.comicId,
          "is_published": true
        };
        updatedComic.$update({id: ComicsNewCtrl.comicId}, function(response) {
          $location.path("comics/show/" + ComicsNewCtrl.comicId);
        },
        function(errorResponse){
          ComicsNewCtrl.hasErrors = true;
          ComicsNewCtrl.errors = [];
          ComicsNewCtrl.errors = errorResponse.data.errors;
        });
      };
    
  }]);
