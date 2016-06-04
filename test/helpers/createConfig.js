import path from 'path';
import errorHandler from '../../example/gulp/util/errorHandler';

const cwd = process.cwd();

const pathsConfig = {
  runnerFile: path.join(cwd, 'example', 'gulp', 'runners.yml'),
  configDir: path.join(cwd, 'example', 'gulp', 'config'),
  taskDir: path.join(cwd, 'example', 'gulp', 'tasks')
};

const pluginsConfig = {
  DEBUG: false,
  camelize: true,
  lazy: true,
  pattern: [
    'gulp-*', 'gulp.*'
  ]
};

const config = Object.assign({}, pathsConfig, {
  errorHandler,
  gulpLoadPluginsConfig: pluginsConfig
});

export default config;
