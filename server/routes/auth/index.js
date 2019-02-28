const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../../database/models/User');

const saltRounds = 12;

router.post('/register', (req, res) => {
  const newUser = req.body;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      res.status(500).json(err);
    }
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) {
        res.status(500).json(err);
      }
      return new User({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        username: newUser.username,
        password: hash
      })
        .save()
        .then(() => {
          return res.json({ success: true });
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, username: req.user.username, id: req.user.id });
});

router.post('/logout', (req, res) => {
  req.logout();
  req.send({ success: true });
});

module.exports = router;
