const { testServer } = require('../../testServer')

let testServerInstance = null;

// needs to be fixed this is off
const initServer = () => {
  testServerInstance = new testServer();
  testServerInstance.openConnection();
  return testServerInstance.getServer();
}

const clearSchema = (schema) => {
  schema.deleteMany({}, err => {
    if(err) {
      console.log(err)
    }
  })
}

const closeServer = (done) => {
  testServerInstance.closeConnection(done)
}

module.exports = {
  initServer, clearSchema, closeServer
}
