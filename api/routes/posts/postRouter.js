const express = require('express')
const posts = require('./postDb')
const { validateUserId, validateUser, validatePost, validatePostId } = require('../../middleware/validate');
const router = express.Router();

router.get('/', (req, res, next) => {
  posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validatePostId(), (req, res, next) => {
  res.json(req.post)
});

router.delete('/:id', validatePostId(), (req, res, next) => {
  posts.remove(req.params.id)
    .then(postId => {
      if (postId) {
        res.status(204).json(postId)
      } else {
        res.status(404).json({ message: "The post did not exist."})
      }
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validatePost(), validatePostId(), (req, res, next) => {
  posts.update(req.params.id, req.body)
  .then(post => {
    posts.getById(req.params.id)
     .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ error: "The post does not exist."})
      } 
     })
     .catch(error => {
       next(error)
     })
  })
  .catch(error => {
    next(error)
  })
});

module.exports = router;