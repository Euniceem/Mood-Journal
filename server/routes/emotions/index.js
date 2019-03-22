const express = require('express');
const router = express.Router();
const Default_Emotion = require('../../../database/models/Default_Emotion');
const Custom_Emotion = require('../../../database/models/Custom_Emotion');
const isAuthenticated = require('../isAuth');

router.get('/emotions', isAuthenticated, (req, res) => {
  const user_id = req.user.id;

  Default_Emotion.fetchAll()
    .then(defaults => {
      Custom_Emotion.query(qb => {
        qb.where('is_deleted', false).andWhere('user_id', user_id);
      })
        .fetchAll()
        .then(customs => {
          defaults = defaults.toJSON();
          customs = customs.toJSON();
          const all = defaults.concat(customs);

          res.json(all);
        })
        .catch(err => {
          res.status(500);
          return res.end('error fetching emotions');
        });
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching emotions');
    });
});

router.get('/emotions/displayed', isAuthenticated, (req, res) => {
  const user_id = req.user.id;

  Default_Emotion.where('is_displayed', true)
    .fetchAll()
    .then(defaults => {
      Custom_Emotion.query(qb => {
        qb.where('is_deleted', false)
          .andWhere('user_id', user_id)
          .andWhere('is_displayed', true);
      })
        .fetchAll()
        .then(customs => {
          defaults = defaults.toJSON();
          customs = customs.toJSON();
          const all = defaults.concat(customs);

          res.json(all);
        })
        .catch(err => {
          res.status(500);
          return res.end('error fetching emotions');
        });
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching emotions');
    });
});

router.put('/emotions', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const customs = req.body.emotions.filter(emotion => emotion.is_custom);
  const defaults = req.body.emotions.filter(emotion => !emotion.is_custom);

  customs.forEach(emotion => {
    Custom_Emotion.query(qb => {
      qb.where('id', emotion.id).andWhere('user_id', user_id);
    }).save({ is_displayed: emotion.is_displayed }, { patch: true });
  });

  defaults.forEach(emotion => {
    Default_Emotion.query(qb => {
      qb.where('id', emotion.id);
    }).save({ is_displayed: emotion.is_displayed }, { patch: true });
  });

  return res.end('emotions updated successfully');
});

router.post('/emotions', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const { name } = req.body;

  console.log(req.body);

  const newEmotion = {
    user_id,
    name,
    is_displayed: true,
    is_deleted: false
  };

  Custom_Emotion.forge(newEmotion)
    .save(null, { method: 'insert' })
    .then(() => res.end('successfully added emotion'))
    .catch(err => {
      console.log(err);
      res.status(500);
      return res.end('error adding emotion');
    });
});

router.delete('/emotions/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;

  Custom_Emotion.query(qb => {
    qb.where('id', id).andWhere('user_id', user_id);
  })
    .save({ is_deleted: true }, { patch: true })
    .then(() => res.end('successfully deleted emotion'))
    .catch(err => {
      res.status(500);
      return res.end('error deleting emotion');
    });
});

module.exports = router;
