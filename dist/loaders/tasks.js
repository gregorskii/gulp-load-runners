'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Task Loader
 * @module Tasks
 * @see loaders:tasks
 * @description Loads tasks found in the `taskDir`.
 * @param {String} taskDir the directory to find tasks
 * @param {Object} gulp the gulp object provided by the project
 * @param {Object} plugins the plugins loaded by `gulp-load-plugins`
 * @param {Object} config the merged project config to pass to function exporting
 * tasks
 * @returns {null} void
 */

exports.default = function (taskDir, gulp, plugins, config) {
  var tasks = _glob2.default.sync(taskDir + '/**/*.js');

  // Get all tasks, iterate over them and let gulp load them into its context
  tasks.forEach(function (file) {
    var imported = require(file);

    // Check if the user is using `module.exports` in their tasks, with import
    // above task will come in with a .default
    if (imported.hasOwnProperty('default')) {
      imported = imported.default;
    }

    // If the task is defined as a function export pass it the instance of
    // gulp, the plugins loaded by `gulp-load-plugins` and the merged config
    if (typeof imported === 'function') {
      imported(gulp, plugins, config);
    }
  });
}; /* eslint global-require: 0 */