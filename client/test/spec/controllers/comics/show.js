'use strict';

describe('Controller: ComicsShowCtrl', function () {

  // load the controller's module
  beforeEach(module('comicsApp'));

  var ComicsShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComicsShowCtrl = $controller('ComicsShowCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ComicsShowCtrl.awesomeThings.length).toBe(3);
  });
});
