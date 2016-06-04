/* eslint arrow-body-style: 0 */

module.exports = (wallaby) => {
  return {
    debug: true,

    files: [
      {pattern: 'node_modules/mocha/**/*.js', instrument: false},
      {pattern: 'node_modules/chai/**/*.js', instrument: false},
      {pattern: 'node_modules/gulp/**/*.js', instrument: false},
      {pattern: 'node_modules/gulp-sequence/**/*.js', instrument: false},
      {
        pattern: 'node_modules/gulp-load-plugins/**/*.js',
        instrument: false
      },
      {pattern: 'lib/**/*.js'},
      {pattern: 'example/**', instrument: false},
      {pattern: 'package.json', instrument: false},
      {pattern: 'test/helpers/*.js'},
      {pattern: 'test/badyml.yml', instrument: false},
      {pattern: 'test/bootstrap/*.js', instrument: false}
    ],

    tests: [
      {pattern: 'test/**/*-spec.js'}
    ],

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    setup: () => {
      require('./test/bootstrap/includeGlobals.js');
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    workers: {
      recycle: true
    }
  };
};
