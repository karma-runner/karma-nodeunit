/**
 Tests for src/adapter.js
 These tests are executed in browser.
 */

describe('nodeunit adapter ', function() {
  var Testacular = window.__testacular__.constructor;

  describe('reporter', function() {
    var runner, tc;

    beforeEach(function() {
      tc = new Testacular(new MockSocket(), {});
      runner = null;
      reporter = new (createStartFn(tc, runner))();
    });
  });
});
