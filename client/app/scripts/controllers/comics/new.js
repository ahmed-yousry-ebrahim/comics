'use strict';

/**
 * @ngdoc function
 * @name comicsApp.controller:ComicsNewCtrl
 * @description
 * # ComicsNewCtrl
 * Controller of the comicsApp
 */
angular.module('comicsApp')
  .controller('ComicsNewCtrl', ['$detection',"Comic",function ($detection, Comic) {
  	var ComicsNewCtrl = this;
    
    ComicsNewCtrl.userAgent = $detection.getUserAgent();
    ComicsNewCtrl.isMobile = $detection.isAndroid() || $detection.isiOS();
    ComicsNewCtrl.comicId = 0;
    ComicsNewCtrl.hasErrors = false;
    ComicsNewCtrl.errors = [];
    ComicsNewCtrl.uploadedImage = {
    	"filename" : "No file selected"
    };

    ComicsNewCtrl.upload = function(){
      if(ComicsNewCtrl.uploadedImage.file != null){
    	if(ComicsNewCtrl.comicId == 0){
    		var comic = new Comic();
    		comic.comic = {"is_published" : false};
    		Comic.save(comic, function(response) {
				  ComicsNewCtrl.comicId = response.id;
  			},
  			function(error){
  				console.log(error);
  			}
  			); 
    	}else{

      }
    }else{
      ComicsNewCtrl.hasErrors = true;
      ComicsNewCtrl.errors = [];
      ComicsNewCtrl.errors.push("You must select a file");
    }
    };
    
  }]);
