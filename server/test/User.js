const User = require('../models/User');
const Auth = require('../util/auth');
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  CONFLICT
} = require('../util/constants').STATUS_CODES;

const {
  initServer, clearSchema, closeServer
} = require('./util/util');
const sinon = require('sinon');
var sandbox = require("sinon").createSandbox();

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

let testServer = null

describe('User', () => {
  // replace this with clearSchema at some point
  before((done) => { 
    testServer = initServer();
    done()    
  });

  beforeEach(() => {
    sandbox.stub(Auth, 'verifyToken')
      .callsFake((req, res, next) => { 
        req.user = {userId: '01234'} 
        return next(); 
      });
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    closeServer(testServer)
  })

  describe('/GET all users in db', () => {
    it('should get all users', async() => {
      chai.request(testServer)
        .get('/user/users')
        .end((err,res) => {
          res.should.have.status(OK);
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

      chai.request(testServer)
      .put('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })
    done();
  })

  describe('/GET user object by id', () => {
    it('it should get user given id. expect 200', async() => {
      const user = {
        _id: '01234'
      }
      chai.request(testServer)
      .post('/user/get')
      .send(user)
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.should.be.a('object')
        // done()
      })
    })

    it('/GET given user id that does not exist. expect 404', async() => {
      const user = {
        _id: '012345'
      }
      chai.request(testServer)
      .get('/user')
      .send(user)
      .end((err, res) => {
        res.should.have.status(NOT_FOUND);
        
      })
    })
  })

  describe('/POST user object in db to edit it', async(done) => {
    it('/POST it should edit user', async() => {

      const user = {
        _id: '01234',
        username: 'isitab',
        publicName: 'isita bagayatkar',
      }

      chai.request(testServer)
      .put('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(OK);
        done();
      });
    })

    it('/POST edit user should fail. return 404 error', async() => {

      const user = {
        _id: '01233',
        username: 'isitab',
        publicName: 'isita bagayatkar',
      }

      chai.request(testServer)
      .put('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(NOT_FOUND);
        done();
      });
    })
  })

  describe('/DELETE user object in db', async(done) => {
    it('it should delete user in db', async() => {

      const user = {
        _id: '01234',
        username: 'isitab',
        publicName: 'isita',
        email: 'isitab@gmail.com',
        pictureUrl: 'www.google.com',
      }

      chai.request(testServer)
      .delete('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })

    it('/DELETE user given id that does not exist. should return 404', async() => {
      const user = {
        _id: '01234',
      }

      chai.request(testServer)
      .delete('/user/')
      .send(user)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })
  })
})
