/*
 Note: Source SCE Core-v4
*/
const {
  initializeTokenMock,
} = require('./TokenUtil');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should()
chai.use(chaiHttp)

class ApiTester {
  constructor(app) {
    this.app = app
  }

  async sendPostRequest(endpoint, object) {
    let response = null;
    await chai
      .request(this.app)
      .post(endpoint)
      .then(initializeTokenMock())
      .send({ object })
      .then(function (res) {
        response = res;
      })
      .catch(err => {
        throw err;
      });
    return response;
  }

  async sendGetRequest(endpoint) {
    let response = null;
    await chai
      .request(this.app)
      .get(endpoint)
      .then(initializeTokenMock())
      .then(function (res) {
        response = res;
      })
      .catch(err => {
        throw err;
      });
    return response;
  }
}

module.exports = ApiTester;
