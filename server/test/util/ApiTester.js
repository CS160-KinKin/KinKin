/*
 Note: Source SCE Core-v4
*/

const chai = require('chai');
const chaiHttp = require('chat-http');
chai.should()
chai.use(chaiHttp)

class ApiTester {
  constructor(app) {
    this.app = app
  }

  async sendPostRequestWithToken(token, endpoint) {
    let response = null;
    await chai
      .request(this.app)
      .post(endpoint)
      .send({ token, ...params })
      .then(function (res) {
        response = res;
      })
      .catch(err => {
        throw err;
      });
    return response;
  }

  async sendGetRequestWithToken(token, endpoint) {
    let response = null;
    await chai
      .request(this.app)
      .get(endpoint)
      .send({ token: token })
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
