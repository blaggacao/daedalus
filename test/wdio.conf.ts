const { join } = require('path');
const fs = require('fs');

//const packageJson = JSON.parse(fs.readFileSync('./package.json'));
//const {
//  build: { daedalus },
//} = packageJson;

const isInDebugMode = process.env.DEBUG === 'true' || process.argv.includes('--debug');

export const config = {
  services: [
    [
      'electron',
      {
        appPath: join(__dirname, 'dist'),
        appName: 'daedalus',
        appArgs: ['foo', 'bar=baz'],
        chromedriver: {
          port: 9519,
          logFileName: 'wdio-chromedriver.log',
        },
      },
    ],
  ],
  capabilities: [{}],
  waitforTimeout: 5000,
  connectionRetryCount: 10,
  connectionRetryTimeout: 30000,
  logLevel: isInDebugMode ? 'debug' : 'warn',
  runner: 'local',
  outputDir: process.env.CI === 'true' ? 'daedalus' : undefined,
  specs: ['./test/specs/**/*.e2e.ts'],
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      files: true,
      project: join(__dirname, 'test', 'tsconfig.json'),
    },
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
  },
};

module.exports = { config };
