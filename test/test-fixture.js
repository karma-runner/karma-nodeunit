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
  }
};
