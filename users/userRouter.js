const express = require('express');
const { validateUserId, validateUser } = require('../middleware/validate');
const users = require('./userDb');

const router = express.Router();

router.post('/', validateUser(), (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
  users.get()
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      next(error)
    })
});

router.get('/:id', validateUserId(), (req, res) => {
  res.json(req.user)
});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId(), (req, res) => {
  hubs.remove(req.user.id)
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