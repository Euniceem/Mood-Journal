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
      res.status(500);
      return res.json(err);
    }

    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        res.status(500);
        return res.json(err);
      }

      return new User({
        email: newUser.email,
        password: hash
      })
        .save()
        .then(() => {
          return res.json({ success: true });
        })
        .catch(err => {
          res.status(500);
          return res.json(err);
        });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  return res.json({ success: true, email: req.user.email });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.send({ success: true });
});

module.exports = router;
