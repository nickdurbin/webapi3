const express = require('express');
const users = require('./userDb');
const posts = require('../posts/postDb')
const { validateUserId, validateUser, validatePost } = require('../../middleware/validate');

const router = express.Router({ mergeParams: true });

router.post('/', validateUser(), (req, res, next) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.post('/:id/posts', validateUserId(), validatePost(),  (req, res, next) => {
  posts.insert({ ...req.body, user_id: req.params.id })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/', (req, res, next) => {
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res, next) => {
  res.json(req.user)
});

router.get('/:id/posts', validateUserId(), validatePost(), (req, res, next) => {
  users.getUserPosts(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(400).json({ message: "You do not have access."})
      }
    })
    .catch(error => [
      next(error)
    ])
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  users.remove(req.user.id)
    .then(user => {
      if (user) {
        res.status(200).json(req.user)
      }
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validateUser(), validateUserId(), (req, res, next) => {
  users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(req.body)
      }
    })
    .catch(error => {
      next(error)
    })
});

module.exports = router;