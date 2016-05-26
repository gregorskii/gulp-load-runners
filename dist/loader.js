'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setupEnv();

exports.default = function (gulp, options) {
  var plugins = (0, _plugins2.default)(options.plugins);
  var config = (0, _config2.default)(options.configDir, options.projectConfig);
  (0, _createTasks2.default)((0, _alias2.default)(options.aliasFile));
  (0, _tasks2.default)(options.taskDir, gulp, plugins, config);
  return {
    plugins: plugins,
    config: config
  };
};