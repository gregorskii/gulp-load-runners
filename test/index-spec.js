import loader from '../lib/index';
import gulp from 'gulp';
import path from 'path';

const cwd = process.cwd();

const pathsConfig = {
  aliasFile: path.join(cwd, 'example', 'gulp', 'aliases.yml'),
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

describe('index', () => {
  it('should export a function', () => {
    assert.typeOf(loader, 'function');
  });

  it('should accept gulp and options hash', () => {
    loader(gulp, Object.assign({}, pathsConfig, {
      gulpLoadPluginsConfig: pluginsConfig
    }));
  });
});
