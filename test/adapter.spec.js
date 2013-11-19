/**
 Tests for src/adapter.js
 These tests are executed in browser.
 */
describe('nodeunit adapter ', function() {
  var Karma = window.__karma__.constructor;

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
      tc = new Karma(new MockSocket(), {});
      reporter = new (createStartFn(tc))();
    });

    it('should report suite completion', function(done) {
      runSuite(completionSuite, function() {
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
        expect(result.description).to.equal("This is only a test");
        expect(result.log.length).to.be(1);
        expect(result.log[0]).to.contain('AssertionError: "real" == "this"');
      });
      runSuite(fixtureSuite.failing, function() {
        done();
      });
    });

    it('should fail tests that throw', function(done) {
      sinon.stub(tc, 'result', function(result) {
        expect(result.success).to.be(false);
        expect(result.description).to.equal("Panic!");
        expect(result.log.length).to.be(1);
        expect(result.log[0]).to.contain('thrown from a test');
      });
      runSuite(fixtureSuite.throwing, function() {
        done();
      });
    });

    it('should setUp and tearDown', function(done) {
      sinon.stub(tc, 'result', function(result) {
        expect(result.description).to.be("Was setUp");
        expect(result.suite).to.be.an('array');
        expect(result.success).to.be(true);
      });
      runSuite(fixtureSuite['setUp and tearDown'], function() {
        done();
      });
    });
  });
});
