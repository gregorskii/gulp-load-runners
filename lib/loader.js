import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';
import createRunners from './createRunners';
import loadRunners from './loaders/runners';
import loadPlugins from './loaders/plugins';
import loadConfig from './loaders/config';
import loadTasks from './loaders/tasks';
import mandatory from './helpers';

const cwd = process.cwd();

const configDir = path.join(cwd, 'gulp', 'config');
const taskDir = path.join(cwd, 'gulp', 'tasks');
const runnerFile = path.join(cwd, 'gulp', 'runners.yml');

/**
 * Task Loader
 * @module Tasks
 * @see loaders:tasks
 * @description Sets up the loader, checks incoming options and defines defaults
 * for `configDir`, `taskDir`, and `runnerFile` if not provided.
 * @param {Object} gulp the user provided gulp instance
 * @param {Object} options this plugins options
 * @returns {Object} The plugins loaded by `gulp-load-plugins`
 */
export default (gulp = mandatory(), options = mandatory()) => {
  /**
   * If there is not an incoming project `config` option for gulpLoadPluginsConfig
   * create one as the path inside of GLP will pick the `gulp-load-runners`
   * package.json by default
   */
  if (!options.gulpLoadPluginsConfig.config) {
    options.gulpLoadPluginsConfig['config'] = path.join(cwd, 'package.json');
  }

  // Load plugins, provide gulpLoadPluginsConfig
  const plugins = loadPlugins(gulpLoadPlugins, options.gulpLoadPluginsConfig || {});
  // Load config providing configDir and projectConfig
  const config = loadConfig(
    options.configDir || configDir, options.projectConfig || {}
  );
  // Load runner defintion object, provide runnerFile path
  const runners = loadRunners(options.runnerFile || runnerFile);

  let errorHandler;

  // Create error handler if present passing it the plugins and config if a function
  if (options.hasOwnProperty('errorHandler') && options.errorHandler) {
    if (typeof options.errorHandler === 'function') {
      errorHandler = options.errorHandler(plugins, config);
    } else {
      errorHandler = options.errorHandler;
    }
  }

  // Load tasks from taskDir
  // passing user provided gulp, loaded plugins, config, and errorHandler if present
  loadTasks(options.taskDir || taskDir, gulp, plugins, config, errorHandler);
  createRunners(runners, gulp, plugins);

  // Return the loaded plugins
  return plugins;
};
