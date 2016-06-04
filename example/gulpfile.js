const gulp = require('gulp');
const gulpLoadRunners = require('../lib/index');
const projectConfig = require('./gulp/gulp.config');
const errorHandler = require('./gulp/util/errorHandler');
const path = require('path');
const cwd = process.cwd();

const pathsConfig = {
  runnersFile: path.join(cwd, 'gulp', 'runners.yml'),
  configDir: path.join(cwd, 'gulp', 'config'),
  taskDir: path.join(cwd, 'gulp', 'tasks')
};

const gulpLoadPluginsConfig = {
  config: path.join(cwd, '..', 'package.json'),
  DEBUG: false,
  camelize: true,
  lazy: true,
  pattern: [
    'gulp-*', 'gulp.*'
  ]
};

gulpLoadRunners(gulp, Object.assign({}, pathsConfig, {
  errorHandler,
  gulpLoadPluginsConfig,
  projectConfig
}));
