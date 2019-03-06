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

router.put('/profile', (req, res) => {
  const id = req.user.id;
  const { email, username, first_name, last_name } = req.body;
  const editedProfile = { email, username, first_name, last_name };

  User.where({ id: id })
    .save(editedProfile, { patch: true })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

router.put('/profile/password', (req, res) => {
  const oldPw = req.body.old;
  const newPw = req.body.new;
  const id = req.user.id;

  User.where('id', id)
    .fetch()
    .then(user => {
      user = user.toJSON({ visibility: false });

      return bcrypt
        .compare(oldPw, user.password)
        .then(bcryptRes => {
          if (!bcryptRes) {
            return false;
          }

          return true;
        })
        .catch(err => false);
    })
    .then(isOldPwAuth => {
      if (!isOldPwAuth) {
        res.status(401);
        return res.end();
      }

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          res.status(500);
          return res.end();
        }

        bcrypt.hash(newPw, salt, (err, hash) => {
          if (err) {
            res.status(500);
            return res.end();
          }

          User.where('id', id)
            .save({ password: hash }, { patch: true })
            .then(() => {
              return res.end('success');
            });
        });
      });
    })
    .catch(err => {
      return res.status(500);
    });
});

module.exports = router;
