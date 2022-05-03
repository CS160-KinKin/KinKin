const { server } = require('../../server')

let serverInstance = null;

// needs to be fixed this is off
const initServer = (path, port=9999) => {
  serverInstance = new server(path,port)
}

const clearSchema = (schema) => {
  schema.deleteMany({}, err => {
    if(err) {
      console.log(err)
    }
  })
}

module.exports = {
  clearSchema,
}
