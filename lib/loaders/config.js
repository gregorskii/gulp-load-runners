/* eslint global-require: 0 */

import glob from 'glob';

export default (options, projectConfig) => {
  const configs = glob.sync(`${options.configDir}/**/*.js`);
  const config = {};
  configs.forEach((file) => {
    const name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;
    if (name) {
      const imported = require(file);
      if (typeof imported === 'function') {
        config[name] = imported(projectConfig);
      } else {
        config[name] = imported;
      }
    }
  });
  return Object.assign({}, config, projectConfig);
};
