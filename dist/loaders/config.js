'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Config Loader
 * @module Config
 * @see loaders:config
 * @description Loads projects gulp config files from the `configDir` and merges them into a
 * exported config that is provided to all tasks.
 * @param {String} configDir the directory to find task configs
 * @param {Object} projectConfig the calling projects optional global config
 * @returns {Object} the merged config
 */

exports.default = function (configDir, projectConfig) {
  var configs = _glob2.default.sync(configDir + '/**/*.js');
  var config = {};

  configs.forEach(function (file) {
    var name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;

    // Ensure the task name can be found
    if (name) {
      // Load it
      var imported = require(file);

      // If the export is a function pass it the current projectConfig
      if (typeof imported === 'function') {
        config[name] = imported(projectConfig);
      } else {
        config[name] = imported;
      }
    }
  });

  // Merge the config into the `projectConfig`
  return Object.assign({}, config, projectConfig);
}; /* eslint global-require: 0 */