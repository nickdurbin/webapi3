const express = require('express')
const posts = require('./postDb')
const { validateUserId, validateUser, validatePost, validatePostId } = require('../../middleware/validate');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res, next) => {
  posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validatePostId, (req, res, next) => {
  return res.status(200).json(req.post)
});

router.delete('/:id', validatePostId, (req, res, next) => {
  posts.remove(req.post.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.put('/:id', validatePost, validatePostId, (req, res, next) => {
  posts.update(req.post.id, req.body)
  .then(count => {
    if (count > 0) {
      res.status(200).json({
        id: req.post.id,
        text: req.body.text,
        user_id: req.post.user_id
      });
    }
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;