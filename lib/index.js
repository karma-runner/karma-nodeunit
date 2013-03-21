var createPattern = function(path) {
  return {pattern: path, included: true, served: true, watched: false};
};

var initNodeunit = function(files) {
  files.unshift(createPattern(__dirname + '/adapter.js'));
  files.unshift(createPattern(__dirname + '/nodeunit.js'));
};

initNodeunit.$inject = ['config.files'];

module.exports = {
  'framework:nodeunit': ['factory', initNodeunit]
};