const express = require('express');
const logger = require('./middleware/logger')
const server = express();

const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')

server.use(logger)
server.use(express.json())

// routes
server.use('api/users', userRouter)
server.use('api/posts', postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

server.use((res, req) => {
  res.status(404).json({ message: "You have ventured into the abyss!"})
})

server.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: "An error occurred, please try again later."
  })
})

module.exports = server;