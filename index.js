const server = require('./server')
require('dotenv').config();

const port = process.env.PORT || 5000
const host = "http://localhost:"

server.listen(port, () => {
  console.log(`Server is listening on ${host}${port}`)
})