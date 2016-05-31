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
const createRunnerTask = (name, tasks, gulp, plugins) => {
  gulp.task(name, plugins.sequence.apply(null, tasks));
};

/**
 * Task creation helper
 * @module createRunners
 * @see createRunners
 * @description Create a new gulp task for every runner config found in the alias.yml.
 * Non Runner tasks are expected to be created in the tasks folder, the tasks
 * that do the work like `sass` are expected to be deifned outside of the alias.yml
 * @param {Object} aliases the aliases loaded from the project aliases.yml
 * @param {Object} gulp the gulp object provided by the project
 * @param {Object} plugins the plugins loaded by `gulp-load-plugins`
 * @returns {null} void
 */
export default (aliases, gulp, plugins) => {
  Object.keys(aliases).forEach((key) => {
    if (aliases.hasOwnProperty(key)) {
      createRunnerTask(key, aliases[key], gulp, plugins);
    }
  });
};
