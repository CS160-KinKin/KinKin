const User = require('../models/User');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require('../api/util/constants').STATUS_CODES;
const tools = require('./util/tools/tools.js');
const {
  initializeTokenMock,
  resetTokenMock,
  restoreTokenMock,
} = require('../test/util/TokenUtil');
const ApiTester = require('./util/ApiTester');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

let server = require('../server'); //<-- should i create server instances instead

let app = null
let test = null

describe('User', () => {
  // initializeTokenMock() //not sure this is gonna work
  // chai.request(server)
  // before(done => {
  //   app = 
  // })
  beforeEach((done) => { 
    User.remove({}, (err) => { 
       done();           
    });        
  });

  describe()
})
