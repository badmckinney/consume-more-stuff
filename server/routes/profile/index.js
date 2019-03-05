const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../../database/models/User');

const saltRounds = 12;

/************************
 *  GET
 ************************/

router.get('/profile', (req, res) => {
  let id = req.user.id;

  User.where('id', id)
    .fetch()
    .then(user => {
      if (!user) {
        res.status(400);
        return res.json({ error: 'That  user does not exist' });
      }

      res.json(user);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

/************************
 *  PUT
 ************************/

router.put('/profile/edit', (req, res) => {
  let id = req.user.id;
  let profile = req.body;

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      res.status(500);
      res.json({ success: false });
    }

    bcrypt.hash(profile.password, salt, (err, hash) => {
      if (err) {
        res.status(500);
        res.json({ success: false });
      }

      User.where({ id: id })
        .save(
          {
            email: profile.email,
            password: hash,
            username: profile.username,
            first_name: profile.first_name,
            last_name: profile.last_name
          },
          { patch: true }
        )
        .then(user => {
          res.json(user);
        })
        .catch(err => {
          res.status(500);
          res.json(err);
        });
    });
  });
});

module.exports = router;
