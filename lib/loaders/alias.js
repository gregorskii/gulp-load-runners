import yml from 'js-yaml';
import fs from 'fs';

/**
 * Alias Loader
 * @module alias
 * @see loaders:alias
 * @description This tool uses a alias file to define runner tasks, much like grunt-load-config
 * This file will read the yml and convert it to an object using `js-yaml`
 * @param {String} aliasFile the alias file path
 * @returns {Object} the object hash of runner tasks to be created
 */
export default (aliasFile) => {
  let aliases;

  // Try reading the yml file, throw an error on failure
  try {
    aliases = yml.load(fs.readFileSync(aliasFile, 'utf8'));
  } catch (err) {
    throw err;
  }

  // Return the loaded object
  return aliases;
};
