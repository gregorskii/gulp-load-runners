import yml from 'js-yaml';
import fs from 'fs';

/**
 * Runner Loader
 * @module runner
 * @see loaders:runner
 * @description This tool uses a runner file to define runner tasks, much like grunt-load-config
 * This file will read the yml and convert it to an object using `js-yaml`
 * @param {String} runnerFile the runner file path
 * @returns {Object} the object hash of runner tasks to be created
 */
export default (runnerFile) => {
  let runners;

  // Try reading the yml file, throw an error on failure
  try {
    runners = yml.load(fs.readFileSync(runnerFile, 'utf8'));
  } catch (err) {
    throw err;
  }

  // Return the loaded object
  return runners;
};
