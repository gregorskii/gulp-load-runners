'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTasks = undefined;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadTasks = exports.loadTasks = function loadTasks(taskDir, gulp, plugins, config) {
  var tasks = _glob2.default.sync(taskDir + '/**/*.js');
  tasks.forEach(function (file) {
    var imported = require(file);
    if (typeof imported === 'function') {
      imported(gulp, plugins, config);
    }
  });
}; /* eslint global-require: 0 */