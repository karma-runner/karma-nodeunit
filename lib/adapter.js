(function(window) {

var formatFailedAssertion = function(assertion) {
  return (assertion.message || assertion.method || 'no message') +
    '\n' + (assertion.error.stack || assertion.error);
};

var createStartFn = function(tc, passedInRunner) {
  var nodeunit = window.nodeunit,
      deferredModules;
  
  // Intercept nodeunit.run in case its called before Karma has started
  nodeunit.run = function(modules) {
    deferredModules = modules;
  };

  return function () {
    var totalNumberOfTest = 0;
    var runner = passedInRunner || nodeunit;

    runner.run = function(modules) {
      runner.runModules(modules, {

        testStart: function(name) {
          totalNumberOfTest += 1;
        },

        testDone: function(name, assertions) {
          var assertion,
              result = {
                description: name.toString(),
                suite: [],
                success: assertions.failures() === 0,
                time: assertions.duration,
                log: []
              };

          for (var i = 0; i < assertions.length; i++) {
            assertion = assertions[i];
            if(assertion.failed()) {
              result.log.push(formatFailedAssertion(assertion));
            }
          }
          tc.result(result);
        },

        done: function(assertions) {
          tc.info({
            total: totalNumberOfTest
          });
          tc.complete({
            coverage: window.__coverage__
          });
        }
      });
    };

    // Run any suites that were waiting for Karma to start
    if(deferredModules) {
      runner.run(deferredModules);
    }
  };
};

var createDumpFn = function (tc, serialize) {
  return function () {

    var args = Array.prototype.slice.call(arguments, 0);

    if (serialize) {
      for (var i = 0; i < args.length; i++) {
        args[i] = serialize(args[i]);
      }
    }

    tc.info({ dump: args });
  };
};


window.__karma__.start = createStartFn(window.__karma__);
window.dump = createDumpFn(window.__karma__, function (value) {
  return window.angular && window.angular.mock && window.angular.mock.dump(value) || value;
});
})(window);
