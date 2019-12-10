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

router.delete('/:id', (req, res, next) => {

});

router.put('/:id', (req, res, next) => {

});

module.exports = router;