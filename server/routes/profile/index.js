const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../../database/models/User');

const saltRounds = 12;

router.put('/profile/password', (req, res) => {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;

  User.where('id', id)
    .fetch()
    .then(user => {
      user = user.toJSON({ visibility: false });

      return bcrypt
        .compare(oldPassword, user.password)
        .then(res => {
          if (!res) {
            return false;
          }

          return true;
        })
        .catch(err => false);
    })
    .then(pwAuth => {
      if (!pwAuth) {
        res.status(401);
        return res.end('incorrect password');
      }

      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          res.status(500);
          return res.json({ error: err });
        }

        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) {
            res.status(500);
            return res.json({ error: err });
          }

          User.where('id', id)
            .save({ password: hash }, { patch: true })
            .then(() => {
              return res.json({ success: true });
            });
        });
      });
    })
    .catch(err => {
      res.status(500);
      return res.json({ error: err });
    });
});

module.exports = router;
