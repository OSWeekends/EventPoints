const { defaults } = require("jest-config")
module.exports = {
  ...defaults,
  setupTestFrameworkScriptFile: '<rootDir>/setupTests.js',
}
