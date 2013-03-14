files = [
  MOCHA,
  MOCHA_ADAPTER,
  'node_modules/expect.js/expect.js',
  'node_modules/sinon/pkg/sinon.js',
  'lib/nodeunit.js',
  'src/*.js',
  'test/*.js'
];

browsers = process.env.TRAVIS ? ['Firefox'] : ['PhantomJS'];

autoWatch = true;
