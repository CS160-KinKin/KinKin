const User = require('../models/User');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  CONFLICT
} = require('../util/constants').STATUS_CODES;
const {
  initializeTokenMock,
  resetTokenMock,
  restoreTokenMock,
} = require('../test/util/TokenUtil');
const {
  initServer, clearSchema, closeServer
} = require('./util/util');
const ApiTester = require('./util/ApiTester');

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
    //emptySchema(User); // do not run
    
    done()    
  });

  after(done => {
    closeServer()
    done();
  });

  // afterEach(() => {
  //   resetTokenMock();
  // });

  describe('/GET all users in db', () => {
    it('should get all users', async(done) => {
      chai.request(testServer)
        .get('/user/users')
        .end((err,res) => {
          res.should.have.status(200)
          res.body.should.be.a('array');
          done();
        })
    })
  })

  describe('/PUT user object in db', () => {
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
      .then(next => {
        verifyTokenMock = sinon.stub(Auth, 'verifyToken')
        .callsFake(async(req,res,next) => {
          return next();
        });

        next();
      })
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      }
      );

    })
  })
})
