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
const ApiTester = require('./util/ApiTester');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

let server = require('../server'); //<-- should i create server instances instead
const { TestWatcher } = require('jest');

let app = null
let test = null
const token = ''

describe('User', () => {
  // replace this with clearSchema at some point
  before((done) => { 
    initializeTokenMock() //not sure this is gonna work
    // app = server;
    // tester = new ApiTester(app);

    done()    
  });

  // beforeEach((done) => {
  //   User.remove({}, (err) => { 
  //     done();           
  //   });
  // });

  after(done => {
    restoreTokenMock();
    done();
  });

  describe('/GET all users in db', () => {
    it('should get all users', async(done) => {
      chai.request(server)
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

      chai.request(server)
      .put('/user/')
      .then(next => {
        verifyTokenMock = sinon.stub(Auth, 'verifyToken')
        .callsFake(async(req,res,next) => {
          return next();
        });
      })
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
      }
      );

    })
  })
})
