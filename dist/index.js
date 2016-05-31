'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loader = require('./loader');

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Index
 * @module index
 * @see index
 * @description Export the loader. File reserves the ability to modify the outputs of
 * this module.
 * @param {Object} gulp project provides the gulp object
 * @param {Object} options the options to configure this plugin
 * @returns {Object} The plugins loaded by `gulp-load-plugins`
 */

exports.default = function (gulp, options) {
  return (0, _loader2.default)(gulp, options);
};