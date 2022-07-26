const { resolve, join } = require('path');
const fs = require('fs');

//const packageJson = JSON.parse(fs.readFileSync('./package.json'));
//const {
//  build: { daedalus },
//} = packageJson;

const isInDebugMode = process.env.DEBUG === 'true' || process.argv.includes('--debug');

const config = {
  services: [
    [
      'electron',
      {
        binaryPath: resolve(__dirname, '..', 'release', 'darwin-x64', 'Daedalus-darwin-x64', 'Daedalus.app', 'Contents', 'MacOS', 'Daedalus'),
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
      project: join(__dirname, 'tsconfig.json'),
    },
  },
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
  },
};

module.exports = { config };
