const express = require('express');
const router = express.Router();
const User_Setting = require('../../../database/models/User_Setting');
const isAuthenticated = require('../isAuth');

router.get('/settings', isAuthenticated, (req, res) => {
  let user = req.user.id;

  return User_Setting
    .where('user_id', user)
    .fetchAll()
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching user settings');
    })
})

router.put('/settings', isAuthenticated, (req, res) => {
  let user = req.user.id;

  return User_Setting
    .query(qb => {
      qb.where('user_id', user)
    })
    .fetch()
    .then(setting => {
      if (!setting) {
        return User_Setting.forge({
          user_id: user,
          homepage: req.body.homepage,
          chosen_emotion_1: req.body.chosen_emotion_1,
          chosen_emotion_2: req.body.chosen_emotion_2,
          chosen_emotion_3: req.body.chosen_emotion_3
        })
          .save()
          .then(() => {
            res.json({ success: true, result: result })

          })
          .catch((err) => {
            res.status(500)
            return res.end('setting not found');
          })
      }
      setting.save({
        homepage: req.body.homepage,
        chosen_emotion_1: req.body.chosen_emotion_1,
        chosen_emotion_2: req.body.chosen_emotion_2,
        chosen_emotion_3: req.body.chosen_emotion_3
      }, { patch: true })
        .then((result) => {
          res.json({ success: true, result: result })
        })
    })
    .catch(err => {
      res.status(500)
      res.end('error editing settings')
    })
})

module.exports = router;