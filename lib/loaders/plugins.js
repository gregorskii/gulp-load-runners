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
export default (gulpLoadPlugins, options) => {
  // Ensure `gulp-load-runners` packages are included
  const runnerPackages = gulpLoadPlugins();
  // Also include the calling projects packages
  const projectPackages = gulpLoadPlugins(options);

  // Merge packages, preferring projects in case of any collisions
  return Object.assign({}, runnerPackages, projectPackages);
};
