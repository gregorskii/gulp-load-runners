'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gulpLoadPlugins = require('gulp-load-plugins');

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Plugin Loader
 * @module plugin
 * @see loaders:plugin
 * @description Loads plugins using `gulp-load-plugins`. Will load plugins for the projects
 * package.json (the calling project), as well as this project, which provides
 * gulp-sequence. The calling projects dependencies are preferred on conflict.
 * @param {Object} options the `gulp-load-plugins` config
 * @returns {Object} the merged plugins
 */

exports.default = function (options) {
  // Ensure `gulp-load-runners` packages are included
  var runnerPackages = (0, _gulpLoadPlugins2.default)();
  // Also include the calling projects packages
  var projectPackages = (0, _gulpLoadPlugins2.default)(options);

  // Merge packages, preferring projects in case of any collisions
  return Object.assign({}, runnerPackages, projectPackages);
};