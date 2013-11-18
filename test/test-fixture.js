var obj = {
  val: 'foo'
};

var fixtureSuite = {
  passing: {
    setUp: function(cb) {
      obj.val = 'bar';
      cb();
    },
    tearDown: function(cb) {
      obj.val = 'foo';
      cb();
    },
    "Ceci nes't pas une test": function(test) {
        test.equal(obj.val, 'bar');
        test.done();
    },
  },

  failing: {
    "This is only a test": function(test) {
      test.equal('this', 'real'); // will fail
      test.done();
    }
  },

  throwing: {
    "Panic!": function(test) {
      throw new Error("thrown from a test");
      test.done();
    }
  }
};

if(typeof exports !== 'undefined') exports.fixtureSuite = fixtureSuite;
if(window.__run) nodeunit.run(fixtureSuite);
