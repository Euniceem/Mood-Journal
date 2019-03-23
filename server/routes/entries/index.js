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
      withRelated: [
        'mood',
        'entryActivities.default_activity',
        'entryActivities.custom_activity',
        'entryEmotions.default_emotion',
        'entryEmotions.custom_emotion'
      ]
    })
    .then(entries => res.json(entries))
    .catch(err => {
      res.status(500);
      return res.end('error fetching entries');
    });
});

router.get('/entries/time', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const start = req.body.start;
  const end = req.body.end;

  Entry.query(qb => {
    qb.where('user_id', user_id)
      .andWhere('created_at', '>', start)
      .andWhere('created_at', '<', end);
  })
    .fetchAll({
      withRelated: [
        'mood',
        'entryActivities.default_activity',
        'entryActivities.custom_activity',
        'entryEmotions.default_emotion',
        'entryEmotions.custom_emotion'
      ]
    })
    .then(entries => {
      if (!entries) {
        res.status(404);
        return res.end('entry not found');
      }

      res.json(entries);
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching entry');
    });
});

router.get('/entries/:id', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const entry_id = req.params.id;

  Entry.query(qb => {
    qb.where('id', entry_id).andWhere('user_id', user_id);
  })
    .fetch({
      withRelated: [
        'mood',
        'entryActivities.default_activity',
        'entryActivities.custom_activity',
        'entryEmotions.default_emotion',
        'entryEmotions.custom_emotion'
      ]
    })
    .then(entries => res.json(entries))
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
    .fetch()
    .then(entry => {
      if (!entry) {
        res.status(404);
        return res.end('entry not found');
      }

      entry.save({ notes }, { patch: true });
      return res.end('successfully edited item');
    })
    .catch(err => {
      res.status(500);
      return res.end('error editing entry');
    });
});

router.post('/entries', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const {
    mood_id,
    notes,
    default_activities,
    custom_activities,
    default_emotions,
    custom_emotions
  } = req.body;

  const entry = { user_id, mood_id, notes };

  Entry.forge(entry)
    .save(null, { method: 'insert' })
    .then(newEntry => {
      const entry_id = newEntry.id;

      if (default_activities) {
        default_activities.forEach(default_activity_id => {
          Entry_Activity.forge({
            entry_id: entry_id,
            default_activity_id: default_activity_id
          }).save();
        });
      }

      if (custom_activities) {
        custom_activities.forEach(custom_activity_id => {
          Entry_Activity.forge({
            entry_id: entry_id,
            custom_activity_id: custom_activity_id
          }).save();
        });
      }

      if (default_emotions) {
        default_emotions.forEach(defaultEmotion => {
          Entry_Emotion.forge({
            entry_id: entry_id,
            default_emotion_id: defaultEmotion.default_emotion_id,
            percent: defaultEmotion.percent
          }).save();
        });
      }

      if (custom_emotions) {
        custom_emotions.forEach(customEmotion => {
          Entry_Emotion.forge({
            entry_id: entry_id,
            custom_emotion_id: customEmotion.custom_emotion_id,
            percent: customEmotion.percent
          }).save();
        });
      }

      return res.end('successfully created entry');
    })
    .catch(err => {
      res.status(500);
      return res.end('error creating new entry');
    });
});

router.delete('/entries/:id', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const entry_id = req.params.id;

  Entry.query(qb => {
    qb.where('id', entry_id).andWhere('user_id', user_id);
  })
    .fetch()
    .then(entry => {
      if (!entry) {
        res.status(404);
        return res.end('entry not found');
      }

      Entry_Activity.where('entry_id', entry_id).destroy();
      Entry_Emotion.where('entry_id', entry_id).destroy();
      entry.destroy();

      res.end('successfully deleted item');
    })
    .catch(err => {
      res.status(500);
      return res.end('error deleting item');
    });
});

module.exports = router;
