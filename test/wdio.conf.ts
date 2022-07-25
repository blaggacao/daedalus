const { join } = require('path');
const fs = require('fs');

//const packageJson = JSON.parse(fs.readFileSync('./package.json'));
//const {
//  build: { daedalus },
//} = packageJson;

export const config = {
  // ...
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json'
    },
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
    waitforTimeout: 5000,
    connectionRetryCount: 10,
    connectionRetryTimeout: 30000,
    logLevel: 'debug',
    runner: 'local',
    outputDir: process.env.CI === 'true' ? 'daedalus' : undefined,
    specs: ['test/specs/**.ts',
    ['test/specs/**']],
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
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      baseUrl: './'
    }
  }
}
module.exports = { config };
