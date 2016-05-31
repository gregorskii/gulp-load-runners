'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Helpers
 * @module helpers
 * @see module:helpers
 */

/**
 * @description Throws an error when a mandatory field is not found
 * @returns {null} void
 */
var mandatory = exports.mandatory = function mandatory() {
  throw new Error('Missing parameter');
};