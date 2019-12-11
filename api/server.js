const express = require('express');
const middleware = require('./middleware/')
const server = express();
const routes = require('./routes/')

server.use(express.json())
middleware(server)
routes(server)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use((res, req) => {
  return res.status(404).json({ message: "You have ventured into the abyss!"})
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An error occurred, please try again later."
  })
})

module.exports = server;