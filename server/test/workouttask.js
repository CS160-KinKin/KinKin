const workouttask = require('../models/workouttask.model');
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

describe('Workout Task', () => {
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

  describe('/PUT user object in db', async(done) => {
    it('it should put user in db', async() => {

      const workout = {
        _id: '01234',
        title: 'Upper body',
        clientId: '01234',
        description: 'A dumbell workout targeting bis and tris',
        duration: 10,
        date: '2016-05-18T16:00:00Z'
      }

      chai.request(testServer)
      .put('/workouts/')
      .send(workout)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })
    done();
  })

  describe('/GET workout task object by id', () => {
    it('/GET it should get workouttask given id', async() => {
      const workout = {
        _id: '01234'
      }
      chai.request(testServer)
      .post('/workouts/get')
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.should.be.a('object')
      })
    })

    it('/GET given workout task id that does not exist. expect 404', async() => {
      const workout = {
        _id: '012345'
      }
      chai.request(testServer)
      .get('/workouts')
      .send(workout)
      .end((err, res) => {
        res.should.have.status(NOT_FOUND);
      })
    })
  })

  describe('/POST workout task object in db to edit it', async(done) => {
    it('/POST edit workout task should pass. return 200', async() => {

      const workout = {
        _id: '01234',
        description: 'this is a new description'
      }

      chai.request(testServer)
      .put('/workouts')
      .send(workout)
      .end((err, res) => {
        res.should.have.status(OK);
        res.body.should.be.a('object');
        done();
      });
    })

    it('/POST edit workout task should fail. return 404', async() => {

      const user = {
        _id: '01233',
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

      const workout = {
        _id: '01234',
      }

      chai.request(testServer)
      .delete('/workout')
      .send(workout)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })

    it('/DELETE user given id that does not exist. should return 404', async() => {
      const workout = {
        _id: '01234',
      }

      chai.request(testServer)
      .delete('/workout')
      .send(workout)
      .end((err, res) => {
        res.should.have.status(OK);
      }
      );
    })
  })
})
