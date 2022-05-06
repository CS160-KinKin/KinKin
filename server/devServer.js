const { testServer } = require('./testServer')

function main() {
  const test = new testServer();
  test.openConnection();
}

main();
