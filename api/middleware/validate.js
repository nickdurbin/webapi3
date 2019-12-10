const users = require('../routes/users/userDb')
const posts = require('../routes/posts/postDb')

function validateUserId() {
  return (req, res, next) => {
    users.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        res.status(404).json({ message: "Invalid user id." })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the user.",
      })
    })
  }
}

function validateUser() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Missing user data."})
    } else if (!req.body.name) {
      return res.status(400).json({ message: "Missing required name field."})
    }
    next()
  }
}

function validatePost() {
  return ( req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "Missing post data."})
    } else if (!req.body.text) {
      return res.status(400).json({ message: "Missing require text field."})
    }
    next()
  }
}

module.exports = {
  validateUserId, validateUser, validatePost
}