
global.chai = require('chai');
global.chai.use(require('chai-as-promised'));
global.expect = chai.expect;

require('./tests/tests.js');