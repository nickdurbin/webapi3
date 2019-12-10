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
  posts.remove(req.user.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `You have successfully deleted ${count} records.` })
      }
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validatePost(), validatePostId(), (req, res, next) => {
  posts.update(req.params.id, req.body)
  .then(post => {
    if (post) {
      res.status(200).json(post)
    }
  })
  .catch(error => {
    next(error)
  })
});

module.exports = router;