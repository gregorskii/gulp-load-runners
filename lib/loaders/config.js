/* eslint global-require: 0 */

import glob from 'glob';

export default (configDir, projectConfig) => {
  const configs = glob.sync(`${configDir}/**/*.js`);
  const config = {};

  configs.forEach((file) => {
    const name = /.+\/(.+)\.(js)/i.test(file) && RegExp.$1;

    if (name) {
      let imported = require(file);

      if (imported.hasOwnProperty('default')) {
        imported = imported.default;
      }

      if (typeof imported === 'function') {
        config[name] = imported(projectConfig);
      } else {
        config[name] = imported;
      }
    }
  });
  return Object.assign({}, config, projectConfig);
};
