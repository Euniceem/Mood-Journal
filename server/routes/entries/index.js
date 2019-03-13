const express = require('express');
const router = express.Router();
const Entry = require('../../../database/models/Entry');
const Entry_Activity = require('../../../database/models/Entry_Activity');
const Entry_Emotion = require('../../../database/models/Entry_Emotion');
const isAuthenticated = require('../isAuth');

router.get('/entries', isAuthenticated, (req, res) => {
  const user_id = req.user.id;

  Entry.where('user_id', user_id)
    .orderBy('created_at', 'DESC')
    .fetchAll({
      withRelated: ['mood', 'entryActivities.activity', 'entryEmotions.emotion']
    })
    .then(entries => res.json(entries))
    .catch(err => {
      res.status(500);
      return res.end('error fetching entries');
    });
});

router.get('/entries/:id', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const entry_id = req.params.id;

  Entry.query(qb => {
    qb.where('id', entry_id).andWhere('user_id', user_id);
  })
    .fetch({
      withRelated: ['mood', 'entryActivities.activity', 'entryEmotions.emotion']
    })
    .then(entry => {
      if (!entry) {
        res.status(404);
        return res.end('entry not found');
      }

      res.json(entry);
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching entry');
    });
});

router.put('/entries/:id', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const entry_id = req.params.id;
  const { notes } = req.body;

  Entry.query(qb => {
    qb.where('id', entry_id).andWhere('user_id', user_id);
  })
    .fetch({
      withRelated: ['mood', 'entryActivities.activity', 'entryEmotions.emotion']
    })
    .then(entry => {
      if (!entry) {
        res.status(400);
        return res.end('entry not found');
      }

      entry.save({ notes }, { patch: true });
      return res.json({ success: true });
    })
    .catch(err => {
      res.status(500);
      return res.end('error editing entry');
    });
});

router.post('/entries', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const { mood_id, notes, emotions, activities } = req.body;
  const entry = { user_id, mood_id, notes };

  Entry.forge()
    .save(entry, { method: 'insert' })
    .then(newEntry => {
      const entry_id = newEntry.id;

      activities.forEach(activity_id => {
        Entry_Activity.forge({
          entry_id: entry_id,
          activity_id: activity_id
        }).save();
      });

      emotions.forEach(entryEmotion => {
        Entry_Emotion.forge({
          entry_id: entry_id,
          emotion_id: entryEmotion.emotion_id,
          percent: entryEmotion.percent
        }).save();
      });

      return res.end('successfully created entry');
    })
    .catch(err => {
      res.status(500);
      return res.end('error creating new entry');
    });
});

router.delete('/api/entries/:id', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const entry_id = req.params.id;

  Entry.query(qb => {
    qb.where('id', entry_id).andWhere('user_id', user_id);
  })
    .destroy()
    .then(() => {
      res.end('successfully deleted item');
    })
    .catch(err => {
      res.status(500);
      return res.end('error deleting item');
    });
});

module.exports = router;
