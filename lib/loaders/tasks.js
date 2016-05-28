/* eslint global-require: 0 */

import glob from 'glob';

export default (taskDir, gulp, plugins, config) => {
  const tasks = glob.sync(`${taskDir}/**/*.js`);

  tasks.forEach(file => {
    let imported = require(file);

    if (imported.hasOwnProperty('default')) {
      imported = imported.default;
    }

    if (typeof imported === 'function') {
      imported(gulp, plugins, config);
    }
  });
};
