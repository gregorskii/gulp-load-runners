import runnerLoader from '../lib/loaders/runners';
import pluginConfig from './helpers/createConfig';
import path from 'path';

const cwd = process.cwd();

describe('runners config', () => {
  it('should return the runners object', () => {
    const runners = runnerLoader(pluginConfig.runnerFile);

    assert.isObject(runners);
  });

  it('should load runners file', () => {
    const runners = runnerLoader(pluginConfig.runnerFile);

    assert.isDefined(runners.default);
    assert.deepEqual(runners.default, ['example']);
  });

  // HOW?

  // it('should throw an exception when given an invalid runners file', () => {
  //   expect(runnerLoader(path.join(cwd, 'test', 'badyml.yml'))).to.throw(Error);
  // })
});
