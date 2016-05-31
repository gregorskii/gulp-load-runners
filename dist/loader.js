'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _createRunners = require('./createRunners');

var _createRunners2 = _interopRequireDefault(_createRunners);

var _alias = require('./loaders/alias');

var _alias2 = _interopRequireDefault(_alias);

var _plugins = require('./loaders/plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _config = require('./loaders/config');

var _config2 = _interopRequireDefault(_config);

var _tasks = require('./loaders/tasks');

var _tasks2 = _interopRequireDefault(_tasks);

var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

var configDir = _path2.default.join(cwd, 'gulp', 'config');
var taskDir = _path2.default.join(cwd, 'gulp', 'tasks');
var aliasFile = _path2.default.join(cwd, 'gulp', 'aliases.yml');

/**
 * Task Loader
 * @module Tasks
 * @see loaders:tasks
 * @description Sets up the loader, checks incoming options and defines defaults
 * for `configDir`, `taskDir`, and `aliasFile` if not provided.
 * @param {Object} gulp the user provided gulp instance
 * @param {Object} options this plugins options
 * @returns {Object} The plugins loaded by `gulp-load-plugins`
 */

exports.default = function () {
  var gulp = arguments.length <= 0 || arguments[0] === undefined ? (0, _helpers2.default)() : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? (0, _helpers2.default)() : arguments[1];

  /**
   * If there is not an incoming project `config` option for gulpLoadPluginsConfig
   * create one as the path inside of GLP will pick the `gulp-load-runners`
   * package.json by default
   */
  if (!options.gulpLoadPluginsConfig.config) {
    options.gulpLoadPluginsConfig['config'] = _path2.default.join(cwd, 'package.json');
  }

  // Load plugins, provide gulpLoadPluginsConfig
  var plugins = (0, _plugins2.default)(options.gulpLoadPluginsConfig || {});
  // Load config providing configDir and projectConfig
  var config = (0, _config2.default)(options.configDir || configDir, options.projectConfig || {});
  // Load runner defintion object, provide aliasFile path
  var aliases = (0, _alias2.default)(options.aliasFile || aliasFile);

  // Load tasks from taskDir, passing user provided gulp, loaded plugins and config
  (0, _tasks2.default)(options.taskDir || taskDir, gulp, plugins, config);
  (0, _createRunners2.default)(aliases, gulp, plugins);

  // Return the loaded plugins
  return plugins;
};