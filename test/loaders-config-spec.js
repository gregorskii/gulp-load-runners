import configLoader from '../lib/loaders/config';
import pluginConfig from './helpers/createConfig';

describe('loader config', () => {
  it('should return a config object', () => {
    const testPackageConfig = {'test': 'config'};
    const mergedConfig = configLoader(pluginConfig.configDir, testPackageConfig);

    assert.isObject(mergedConfig);
  });

  it('should return a merged config of config dir configs and package config', () => {
    const testPackageConfig = {'test': 'config'};
    const mergedConfig = configLoader(pluginConfig.configDir, testPackageConfig);

    assert.isDefined(mergedConfig.example);
    assert.isDefined(mergedConfig.test);
    assert.equal(mergedConfig.test, testPackageConfig.test);
  });

  it('should provide a default config if no arguments are specified', () => {
    const mergedConfig = configLoader();

    assert.isObject(mergedConfig);
  });

  it('should provide a default config if a config path is not specified', () => {
    const mergedConfig = configLoader(null);

    assert.isObject(mergedConfig);
  });

  it('should provide a default config if a packageConfig is not defined', () => {
    const mergedConfig = configLoader(null, null);

    assert.isObject(mergedConfig);
  });
});
