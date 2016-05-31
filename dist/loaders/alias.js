'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Alias Loader
 * @module alias
 * @see loaders:alias
 * @description This tool uses a alias file to define runner tasks, much like grunt-load-config
 * This file will read the yml and convert it to an object using `js-yaml`
 * @param {String} aliasFile the alias file path
 * @returns {Object} the object hash of runner tasks to be created
 */

exports.default = function (aliasFile) {
  var aliases = void 0;

  // Try reading the yml file, throw an error on failure
  try {
    aliases = _jsYaml2.default.load(_fs2.default.readFileSync(aliasFile, 'utf8'));
  } catch (err) {
    throw err;
  }

  // Return the loaded object
  return aliases;
};