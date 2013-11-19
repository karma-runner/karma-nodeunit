var completionSuite = {
  a: function(test) {
    test.ok(true);
    test.done();
  },

  b: function(test) {
    test.ok(false);
    test.done();
  }
};

var fixtureSuite = {
  passing: {
    "Ceci nes't pas une test": function(test) {
        test.notStrictEqual(this, 'une test');
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
  },

  "setUp and tearDown": {
    setUp: function(cb) {
      this.wasSetup = true;
      cb();
    },
    tearDown: function(cb) {
      this.wasSetup = false
      cb();
    },
    "Was setUp": function(test){
      test.ok(this.wasSetup);
      test.done();
    }
  }
};
