'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _createTasks = require('./createTasks');

var _createTasks2 = _interopRequireDefault(_createTasks);

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

exports.default = function () {
  var gulp = arguments.length <= 0 || arguments[0] === undefined ? (0, _helpers2.default)() : arguments[0];
  var options = arguments.length <= 1 || arguments[1] === undefined ? (0, _helpers2.default)() : arguments[1];

  var plugins = (0, _plugins2.default)(gulp, options.gulpLoadPluginsConfig || {});
  var config = (0, _config2.default)(options.configDir || configDir, options.projectConfig || {});
  (0, _tasks2.default)(options.taskDir || taskDir, gulp, plugins, config);
  (0, _createTasks2.default)((0, _alias2.default)(options.aliasFile || aliasFile), gulp, plugins);
};