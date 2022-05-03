// token verification function
const Auth = require('../../util/auth');
const TokenValidation = require('../../../api/util/token-verification');
const sinon = require('sinon');


const initializeTokenMock = () => {
  verifyTokenMock = sinon.stub(Auth, 'verifyToken');
}

const restoreTokenMock = () => {
  verifyTokenMock.restore();
}

const resetTokenMock = () => {
  verifyTokenMock.reset();
}

module.exports = { initializeTokenMock, resetTokenMock, restoreTokenMock };
