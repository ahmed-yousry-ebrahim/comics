'use strict';

/**
 * @ngdoc function
 * @name comicsApp.controller:ComicsNewCtrl
 * @description
 * # ComicsNewCtrl
 * Controller of the comicsApp
 */
angular.module('comicsApp')
  .controller('ComicsNewCtrl', ['$detection',"Comic", "Stripe",function ($detection, Comic, Stripe) {
  	var ComicsNewCtrl = this;
    
    ComicsNewCtrl.userAgent = $detection.getUserAgent();
    ComicsNewCtrl.isMobile = $detection.isAndroid() || $detection.isiOS();
    ComicsNewCtrl.comicId = 0;
    ComicsNewCtrl.hasErrors = false;
    ComicsNewCtrl.errors = [];
    ComicsNewCtrl.uploadedImage = {
    	"filename" : "No file selected"
    };

    ComicsNewCtrl.createStripe = function(){
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
          console.log(response);
          ComicsNewCtrl.uploadedImage = {
            "filename" : "No file selected"
          };
        },
        function(error){
          console.log(error);
        });
    };

    ComicsNewCtrl.upload = function(){
      if(ComicsNewCtrl.uploadedImage.base64 != null){        
      	if(ComicsNewCtrl.comicId == 0){
      		var comic = new Comic();
      		comic.comic = {"is_published" : false};
      		Comic.save(comic, function(response) {
  				  ComicsNewCtrl.comicId = response.id;
            ComicsNewCtrl.createStripe();
    			},
    			function(error){
    				console.log(error);
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
    
  }]);
