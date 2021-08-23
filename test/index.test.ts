import _ from 'lodash';
import path from 'path';
import ComponentStarter from '../src/index';
import sinon from 'sinon';
import fse from 'fs-extra';
import FC from '@alicloud/fc2';

const sandbox = sinon.createSandbox();
const componentStarter = new ComponentStarter();

const name = 'testSuite';
const dir = './test/testInfo/';
const inputs = {
  props: {
    region: 'cn-shenzhen',
    serviceName: name,
    functionName: name,
  },
  credentials: {
    AccountID: 'AccountID',
    AccessKeyID: 'AccessKeyID',
    AccessKeySecret: 'AccessKeySecret',
  },
  appName: 'fc-info-test',
  project: {
    component: 'devsapp/fc-info',
    access: 'test',
    projectName: 'test',
  },
  command: '',
  args: '--region',
  path: {
    configPath: path.join(process.cwd(), '..', 'example', 's.yaml'),
  },
};

describe('test/index.test.ts', () => {
  beforeEach(async () => {
    sandbox.stub(FC.prototype, 'getService').resolves({
      data: { name },
    });
    sandbox.stub(FC.prototype, 'listFunctions').resolves({
      data: { functions: [{ name }],
    } });
    sandbox.stub(FC.prototype, 'getFunction').resolves({
      data: { functionName: name },
    });
    sandbox.stub(FC.prototype, 'getFunctionCode').resolves({
      data: { url: 'https://registry.devsapp.cn/simple/devsapp/fc-info/zipball/0.0.11' }
    });
    sandbox.stub(FC.prototype, 'listTriggers').resolves({
      data: { triggers: [{ name }] },
    });
    sandbox.stub(FC.prototype, 'getTrigger').resolves({
      data: {
        triggerName: 'http',
        triggerType: 'http',
        triggerConfig: {},
      },
    });
  });

  afterEach(async () => {
    sandbox.restore();
    await fse.remove(dir);
  });

  it('info info', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = 'info';
    const result = await componentStarter.info(inp);
    expect(Object.keys(result)).toEqual(['service', 'function', 'triggers']);
  });

  it('info help', async () => {
    const inp = _.cloneDeep(inputs);
    inp.args = `--help`;
    const result = await componentStarter.info(inp);
    expect(result).toBeUndefined();
  });
});
