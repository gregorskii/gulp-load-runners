import path from 'path';
import createRunnerTasks from './createTasks';
import loadAliases from './loaders/alias';
import loadPlugins from './loaders/plugins';
import loadConfig from './loaders/config';
import loadTasks from './loaders/tasks';
import mandatory from './helpers';

const cwd = process.cwd();

const configDir = path.join(cwd, 'gulp', 'config');
const taskDir = path.join(cwd, 'gulp', 'tasks');
const aliasFile = path.join(cwd, 'gulp', 'aliases.yml');

export default (gulp = mandatory(), options = mandatory()) => {
  const plugins = loadPlugins(options.gulpLoadPluginsConfig || {});
  const config = loadConfig(options.configDir || configDir, options.projectConfig || {});
  createRunnerTasks(loadAliases(options.aliasFile || aliasFile), gulp);
  loadTasks(options.taskDir || taskDir, gulp, plugins, config);
};
