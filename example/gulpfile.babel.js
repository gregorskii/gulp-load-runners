import gulp from 'gulp';
import gulpLoadRunners from '../dist/index';
import projectConfig from './gulp/gulp.config';
import errorHandler from './gulp/util/errorHandler';
import path from 'path';

const cwd = process.cwd();

const pathsConfig = {
  aliasFile: path.join(cwd, 'gulp', 'aliases.yml'),
  configDir: path.join(cwd, 'gulp', 'config'),
  taskDir: path.join(cwd, 'gulp', 'tasks')
};

const gulpLoadPluginsConfig = {
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
