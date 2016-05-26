import createRunnerTasks from './createTasks';
import loadAliases from './loaders/alias';
import loadPlugins from './loaders/plugins';
import loadConfig from './loaders/config';
import loadTasks from './loaders/tasks';

// setupEnv();
export default (gulp, options) => {
  const plugins = loadPlugins(options.plugins);
  const config = loadConfig(options.configDir, options.projectConfig);
  createRunnerTasks(loadAliases(options.aliasFile));
  loadTasks(options.taskDir, gulp, plugins, config);
  return {
    plugins,
    config
  };
};
