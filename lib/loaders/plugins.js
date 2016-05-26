import gulpLoadPlugins from 'gulp-load-plugins';

export default (gulp, options) =>
  Object.assign({}, { gulp }, gulpLoadPlugins(options));
