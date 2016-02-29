'use strict';

describe('Controller: ComicsIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('comicsApp'));

  var ComicsIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComicsIndexCtrl = $controller('ComicsIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ComicsIndexCtrl.awesomeThings.length).toBe(3);
  });
});
