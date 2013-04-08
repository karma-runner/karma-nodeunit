# karma-nodeunit
Adapter for the Nodeunit testing framework.  For more information on Karma see the [homepage](http://karma-runner.github.com).

Currently supports Karma 0.8.x

[![Build Status](https://travis-ci.org/karma-runner/karma-nodeunit.png)](https://travis-ci.org/karma-runner/karma-nodeunit)

## Usage
1. `npm install karma-nodeunit` or add it to your `package.json`.
2. Include nodeunit and the karma adapter in your `karma.conf.js`:
    
        files = [
          'node_modules/karma-nodeunit/lib/nodeunit.js',
          'node_modules/karma-nodeunit/lib/adapter.js',
          'test/*.js'
        ];
        browsers = ['Chrome'];
        ...

3. Write your nodeunit tests:

        nodeunit.run({
          testSomething: function(test) {
            test.expect(1);
            test.ok(true, "this assertion should pass");
            test.done();
          },
          'test something else': function(test) {
            test.ok(false, "this assertion should fail");
            test.done();
          }
        });

