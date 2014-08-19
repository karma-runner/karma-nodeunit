(function(window) {

var formatFailedAssertion = function(assertion) {
  var stack = assertion.error.stack;
  return (assertion.message || assertion.method || 'no message') +
    '\n' + (assertion.error) +
    (stack ? ('\n' + stack) : '');
};


var reportNumberOfTests = function (tc, modules) {
  var totalNumberOfTests = 0;
  for (var key in modules) {
    var mod = modules[key];
    if (!mod || (typeof mod !== 'object')) {
      continue;
    }

    for (var testName in mod) {
      if (testName === 'setUp' || testName === 'tearDown') {
        continue;
      }

      var fn = mod[testName];
      if (typeof fn !== 'function') {
        continue;
      }

      totalNumberOfTests++;
    }
  }

  tc.info({
    total: totalNumberOfTests
  });
};


var createStartFn = function(tc, passedInRunner) {
  var nodeunit = window.nodeunit,
      deferredModules;

  // Intercept nodeunit.run in case its called before Karma has started
  nodeunit.run = function(modules) {
    deferredModules = modules;
  };

  return function () {
    var runner = passedInRunner || nodeunit;

    runner.run = function(modules) {
      reportNumberOfTests(tc, modules);
      runner.runModules(modules, {

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
