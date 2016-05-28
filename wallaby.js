/* eslint arrow-body-style: 0 */

module.exports = (wallaby) => {
  return {
    debug: true,

    files: [
      'lib/**/*.js'
    ],

    tests: [
      {pattern: 'node_modules/gulp/index.js', instrument: false, ignore: true},
      {pattern: 'node_modules/gulp-sequence/index.js', instrument: false},
      {pattern: 'test/helpers/*.js', instrument: false},
      {pattern: 'package.json', instrument: false},
      'example/**/*.{js,yml}',
      'test/**/*-spec.js'
    ],

    env: {
      type: 'node'
    },

    testFramework: 'mocha',

    setup: (wallaby) => {
      global.chai = require('chai');
      global.expect = chai.expect;
      global.assert = chai.assert;
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    workers: {
      recycle: true
    }
  };
};
