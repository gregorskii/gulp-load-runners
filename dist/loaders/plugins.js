'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gulpLoadPlugins = require('gulp-load-plugins');

var _gulpLoadPlugins2 = _interopRequireDefault(_gulpLoadPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (gulp, options) {
  return Object.assign({}, { gulp: gulp }, (0, _gulpLoadPlugins2.default)(options));
};