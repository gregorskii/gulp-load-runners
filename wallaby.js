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
      {pattern: 'package.json', instrument: false}
    ],

    tests: [
      {pattern: 'test/helpers/*.js', instrument: false},
      {pattern: 'test/**/*-spec.js'}
    ],

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    setup: (wallaby) => {
      require('./test/helpers/bootstrap.js');
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    workers: {
      recycle: true
    }
  };
};
