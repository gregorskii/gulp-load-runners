import yml from 'js-yaml';
import fs from 'fs';

export const loadAliases = (aliasFile) => {
  let aliases;

  try {
    aliases = yml.load(fs.readFileSync(aliasFile, 'utf8'));
  } catch (err) {
    throw err;
  }

  return aliases;
};
