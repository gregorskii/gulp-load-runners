/* eslint global-require: 0 */

import glob from 'glob';

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
 * @param {Object} errorHandler the user supplied error handler object
 * @returns {null} void
 */
export default (taskDir, gulp, plugins, config, errorHandler) => {
  const tasks = glob.sync(`${taskDir}/**/*.js`);

  // Get all tasks, iterate over them and let gulp load them into its context
  tasks.forEach(file => {
    let imported = require(file);

    // Check if the user is using `module.exports` in their tasks, with import
    // above task will come in with a .default
    if (imported.hasOwnProperty('default')) {
      imported = imported.default;
    }

    // If the task is defined as a function export pass it the instance of
    // gulp, the plugins loaded by `gulp-load-plugins`, the merged config,
    // and the errorHandler if present
    if (typeof imported === 'function') {
      imported(gulp, plugins, config, errorHandler);
    }
  });
};
