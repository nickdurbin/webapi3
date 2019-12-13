const users = require('../routes/users/userDb')
const posts = require('../routes/posts/postDb')

function validateUserId(req, res, next) {
  console.log(req.params, 'I am inside validateUserId')
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

function validateUser(req, res, next) {
  
  if (!req.body) {
    return res.status(400).json({ message: "Missing user data."})
  } else if (!req.body.name) {
    return res.status(400).json({ message: "Missing required name field."})
  }
  next()
}

function validatePost(req, res, next) {
 
    if (!req.body) {
      return res.status(400).json({ message: "Missing post data."})
    } else if (!req.body.text) {
      return res.status(400).json({ message: "Missing require text field."})
    }
    next()
}

function validatePostId(req, res, next) {
 console.log(req.params, 'I am in the validatePostId')
  posts.getById(req.params.id)
  .then(post => {
    if (post) {
      req.post = post;
      next();
    } else {
      return res.status(400).json({ message: "invalid post id" });
    }
  })
  .catch(error => {
    console.log(error, 'Validate Post Id.')
    next(error);
  });
};

module.exports = {
  validateUserId, validateUser, validatePost, validatePostId
}