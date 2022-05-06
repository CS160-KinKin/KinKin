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
var sandbox = require("sinon").createSandbox();

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);


let testServer = null

describe('Client', () => {
  // replace this with clearSchema at some point
  before((done) => { 
    testServer = initServer();
    done()    
  });

  beforeEach(() => {
    sandbox.stub(Auth, 'verifyToken')
      .callsFake((req, res, next) => { 
        req.user = {
          userId: '01234'
        }
        return next(); });
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(() => {
    closeServer(testServer)
  })

  describe('/PUT client object in db', async(done) => {
    it('it should put client in db', async() => {

      const client = {
        _id: '01234',
        bio: 'hi! its me',
        langauges: ['english','spanish'],
        interests: ['rock climbing'],
        trainingGoals: 'bulk'
      }

      chai.request(testServer)
      .put('/client')
      .send(client)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })
    done();
  })

  describe('/GET client object by id', () => {
    it('/GET it should get client given id', async() => {
      const client = {
        _id: '01234'
      }
      chai.request(testServer)
      .post('/client/get')
      .send(client)
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.should.be.a('object')
      })
    })

    it('/GET given client id that does not exist. expect 404', async() => {
      const client = {
        _id: '012345'
      }
      chai.request(testServer)
      .post('/client/get')
      .send(client)
      .end((err, res) => {
        res.should.have.status(NOT_FOUND);
      })
    })
  })

  describe('/POST client object in db to edit it', async(done) => {
    it('/POST client should pass. return 200', async() => {

      const client = {
        _id: '01234',
        bio: 'this is a new bio'
      }

      chai.request(testServer)
      .post('/client')
      .send(client)
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.should.be.a('object');
        done();
      });
    })

    it('/POST edit client should fail. return 404', async() => {

      const client = {
        _id: '01233',
      }

      chai.request(testServer)
      .post('/client')
      .send(client)
      .end((err, res) => {
        res.should.have.status(NOT_FOUND);
        done();
      });
    })
  })

  describe('/DELETE client object in db', async(done) => {
    it('it should delete client in db', async() => {

      const client = {
        _id: '01234',
      }

      chai.request(testServer)
      .delete('/client')
      .send(client)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })

    it('/DELETE client given id that does not exist. should return 404', async() => {
      const client = {
        _id: '01234',
      }

      chai.request(testServer)
      .delete('/client')
      .send(client)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })
  })
})
