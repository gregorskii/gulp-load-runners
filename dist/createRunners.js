"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @description Creates gulp tasks (for this module 'runner tasks'),
 * which are created to orchestrate running of multiple related task,
 * gulp then registers them to its known task list
 * @param {String} name the name of the task
 * @param {Object} tasks the tasks to run when this task is called
 * @param {Object} gulp the gulp object provided by the project
 * @param {Object} plugins the plugins loaded by `gulp-load-plugins`
 * @returns {null} void
 */
var createRunnerTask = function createRunnerTask(name, tasks, gulp, plugins) {
  gulp.task(name, plugins.sequence.apply(null, tasks));
};

/**
 * Task creation helper
 * @module createRunners
 * @see createRunners
 * @description Create a new gulp task for every runner config found in the runners.yml.
 * Non Runner tasks are expected to be created in the tasks folder, the tasks
 * that do the work like `sass` are expected to be deifned outside of the runners.yml
 * @param {Object} runners the runners loaded from the project runners.yml
 * @param {Object} gulp the gulp object provided by the project
 * @param {Object} plugins the plugins loaded by `gulp-load-plugins`
 * @returns {null} void
 */

exports.default = function (runners, gulp, plugins) {
  Object.keys(runners).forEach(function (key) {
    if (runners.hasOwnProperty(key)) {
      createRunnerTask(key, runners[key], gulp, plugins);
    }
  });
};