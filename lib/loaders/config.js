/* eslint global-require: 0 */

import glob from 'glob';

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
export default (configDir, projectConfig) => {
  const configs = glob.sync(`${configDir}/**/*.js`);
  const config = {};

  configs.forEach((file) => {
    const name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;

    // Ensure the task name can be found
    if (name) {
      // Load it
      let imported = require(file);

      // Check if the user is using `module.exports` in their tasks, with import
      // above task will come in with a .default
      if (imported.hasOwnProperty('default')) {
        imported = imported.default;
      }

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
};
