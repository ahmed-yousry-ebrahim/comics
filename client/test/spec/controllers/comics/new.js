'use strict';

describe('Controller: ComicsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('comicsApp'));

  var ComicsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComicsNewCtrl = $controller('ComicsNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ComicsNewCtrl.awesomeThings.length).toBe(3);
  });
});
