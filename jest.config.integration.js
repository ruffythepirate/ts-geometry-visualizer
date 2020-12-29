const conf = require('./jest.config');
   
conf.modulePathIgnorePatterns = [];
conf.testRegex = ".*/integration-tests/.*\\.test\\.(ts|tsx|js)$"
module.exports = conf;
