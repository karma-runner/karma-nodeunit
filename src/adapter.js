var formatFailedAssertion = function(assertion) {
  return (assertion.message || assertion.method || 'no message') +
    '\n' + (assertion.error.stack || a.error);
};

var createStartFn = function(tc, passedInRunner) {
  return function () {
    var totalNumberOfTest = 0;
    var runner = passedInRunner || window.nodeunit;

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
            result.log.push(formatFailedAssertion);
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
