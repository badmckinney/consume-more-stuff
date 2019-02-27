const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../../database/models/User');

const saltRounds = 12;

router.post('/register'),
  (req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        res.status(500).json(err);
      }
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        if (err) {
          res.status(500).json(err);
        }
        return new User({
          username: req.body.username,
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
  };

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, username: req.user.username, id: req.user.id });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.send({ success: true });
});

module.exports = router;