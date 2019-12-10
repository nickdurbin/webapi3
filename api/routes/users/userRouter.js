const express = require('express');
const users = require('./userDb');
const { validateUserId, validateUser, validatePost } = require('../../middleware/validate');

const router = express.Router({ mergeParams: true });

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.post('/:id/posts', validateUserId(), validatePost(),  (req, res) => {
  users.getUserPosts(req.params.id)
    .then(user => {
      if (user) {
        user.insert(req.body)
        .then(data => {
          res.status(204).json({ ...data, ...req.body })
        })
      } else {
        res.status(404).json({ message: "User posts not found." })
      }
    })
    .catch(error => {
      next(error)
    })
});

router.get('/', (req, res) => {
  console.log(users)
  users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', validateUserId(), validatePost(), (req, res) => {
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

router.delete('/:id', validateUserId(), (req, res) => {
  users.remove(req.user.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `You have successfully deleted ${count} records.` })
      }
    })
    .catch(error => {
      next(error)
    })
});

router.put('/:id', validateUserId(), validateUser(), (req, res) => {
  users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      }
    })
    .catch(error => {
      next(error)
    })
});

module.exports = router;