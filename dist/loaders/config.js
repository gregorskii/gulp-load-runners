'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadConfig = undefined;

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadConfig = exports.loadConfig = function loadConfig(options, projectConfig) {
  var configs = _glob2.default.sync(options.configDir + '/**/*.js');
  var config = {};
  configs.forEach(function (file) {
    var name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;
    if (name) {
      var imported = require(file);
      if (typeof imported === 'function') {
        config[name] = imported(projectConfig);
      } else {
        config[name] = imported;
      }
    }
  });
  return Object.assign({}, config, projectConfig);
}; /* eslint global-require: 0 */