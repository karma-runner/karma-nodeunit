/**
 Tests for src/adapter.js
 These tests are executed in browser.
 */
describe('nodeunit adapter ', function() {
  var Testacular = window.__testacular__.constructor;

  describe('running a suite of tests', function() {
    var runner, tc, reporter;

    var runSuite = function (suite, done) {
      runner.run([suite]);
      sinon.stub(tc, 'complete', function() {
        done();
      });
    };

    beforeEach(function() {
      runner = window.nodeunit;
      tc = new Testacular(new MockSocket(), {});
      reporter = new (createStartFn(tc))();
    });

    it('should report suite completion', function(done) {
      runSuite(fixtureSuite, function() {
        expect(tc.complete.called).to.be(true);
        done();
      });
    });

    it('should report test results', function(done) {
      sinon.stub(tc, 'result', function(result) {
        expect(result.description).to.equal("Ceci nes't pas une test");
        expect(result.suite).to.be.an('array');
        expect(result.success).to.be(true);
        expect(result.log).to.be.an('array');
      });
      runSuite(fixtureSuite.passing, function() {
        done();
      });
    });

    it('should report test failures', function(done) {
      sinon.stub(tc, 'result', function(result) {
        expect(result.success).to.be(false);
      });
      runSuite(fixtureSuite.failing, function() {
        done();
      });
    });
  });
});
