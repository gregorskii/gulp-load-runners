'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadAliases = undefined;

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadAliases = exports.loadAliases = function loadAliases(aliasFile) {
  var aliases = void 0;

  try {
    aliases = _jsYaml2.default.load(_fs2.default.readFileSync(aliasFile, 'utf8'));
  } catch (err) {
    throw err;
  }

  return aliases;
};