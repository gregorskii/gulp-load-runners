import loader from './loader';

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
module.exports = (gulp, options) => {
  return loader(gulp, options);
};
