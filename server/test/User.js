const User = require('../models/User');
const Auth = require('../util/auth');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require('../util/constants').STATUS_CODES;

const {
  initServer, clearSchema, closeServer
} = require('./util/util');
const ApiTester = require('./util/ApiTester');
const sinon = require('sinon');
var sandbox = require("sinon").createSandbox();

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

const { TestWatcher } = require('jest');

let app = null
let testServer = null
const token = ''

describe('User', () => {
  // replace this with clearSchema at some point
  before((done) => { 
    testServer = initServer();
    done()    
  });

  beforeEach(() => {
    sandbox.stub(Auth, 'verifyToken')
      .callsFake((req, res, next) => { return {}; });
  });

  afterEach(() => {
    sandbox.restore();
  });

  // after((done) => {
  //   closeServer(done)
  // });

  

  describe('/GET all users in db', () => {
    it('should get all users', async() => {
      chai.request(testServer)
        .get('/user/users')
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');

          if(err) {console.log(err)}
        })
    })
  })

  describe('/PUT user object in db', async(done) => {
    it('it should put user in db', async() => {

      const user = {
        _id: '01234',
        username: 'isitab',
        publicName: 'isita',
        email: 'isitab@gmail.com',
        pictureUrl: 'www.google.com',
      }

      // const response = await TestWatcher.sendPostRequest('/user/', user);

      chai.request(testServer)
      .put('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      }
      );

    })
    done();
  })
})
