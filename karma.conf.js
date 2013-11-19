module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    files: [
      'node_modules/expect.js/expect.js',
      'node_modules/sinon/pkg/sinon.js',
      'lib/nodeunit.js',
      'src/*.js',
      'test/*.js'
    ],
    autoWatch: true,
    browsers: process.env.TRAVIS ? ['Firefox'] : ['Firefox', 'Chrome']
  });
};
