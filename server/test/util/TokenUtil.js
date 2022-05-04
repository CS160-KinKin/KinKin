// token verification function
const Auth = require('../../util/auth');
const sinon = require('sinon');

const initializeTokenMock = () => {
  verifyTokenMock = sinon.stub(Auth, 'verifyToken')
    .callsFake(async(req,res,next) => {
      return next();
    });
}

const restoreTokenMock = () => {
  verifyTokenMock.restore();
}

const resetTokenMock = () => {
  verifyTokenMock.reset();
}

module.exports = { initializeTokenMock, resetTokenMock, restoreTokenMock };
