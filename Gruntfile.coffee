module.exports = (grunt) ->
  files = ['src/adapter.js']
  grunt.initConfig
    pkgFile: 'package.json'

    build: 
      adapter: files

    # JSHint options
    # http://www.jshint.com/options/
    jshint:
      adapter:
        files:
          src: files
        options:
          browser: true,
          es5: true,
          strict: false
          undef: false
          camelcase: false

      options:
        quotmark: 'single'
        camelcase: true
        strict: true
        trailing: true
        curly: true
        eqeqeq: true
        immed: true
        latedef: true
        newcap: true
        noarg: true
        sub: true
        undef: true
        boss: true
        globals: {}

    karma:
      adapter:
        configFile: 'karma.conf.js'
        autoWatch: false
        singleRun: true
        reporters: ['dots']

  grunt.loadTasks 'tasks'
  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-karma'

  grunt.registerTask 'default', ['build', 'jshint', 'test']
  grunt.registerTask 'test', ['karma']

