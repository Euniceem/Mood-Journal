const express = require('express');
const router = express.Router();
const Default_Activity = require('../../../database/models/Default_Activity');
const Custom_Activity = require('../../../database/models/Custom_Activity');
const isAuthenticated = require('../isAuth');

router.get('/activities', isAuthenticated, (req, res) => {
  const user_id = req.user.id;

  Default_Activity.fetchAll()
    .then(defaults => {
      Custom_Activity.query(qb => {
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
          return res.end('error fetching activities');
        });
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching activities');
    });
});

router.get('/activities/displayed', isAuthenticated, (req, res) => {
  const user_id = req.user.id;

  Default_Activity.where('is_displayed', true)
    .fetchAll()
    .then(defaults => {
      Custom_Activity.query(qb => {
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
          return res.end('error fetching activities');
        });
    })
    .catch(err => {
      res.status(500);
      return res.end('error fetching activities');
    });
});

router.put('/activities', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const customs = req.body.activities.filter(activity => activity.is_custom);
  const defaults = req.body.activities.filter(activity => !activity.is_custom);

  customs.forEach(activity => {
    Custom_Activity.query(qb => {
      qb.where('id', activity.id).andWhere('user_id', user_id);
    }).save({ is_displayed: activity.is_displayed }, { patch: true });
  });

  defaults.forEach(activity => {
    Default_Activity.query(qb => {
      qb.where('id', activity.id);
    }).save({ is_displayed: activity.is_displayed }, { patch: true });
  });

  return res.end('activities updated successfully');
});

router.post('/activities', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const { name } = req.body;

  const newActivity = {
    user_id,
    name,
    is_displayed: true,
    is_deleted: false
  };

  Custom_Activity.forge(newActivity)
    .save(null, { method: 'insert' })
    .then(() => res.end('successfully added activity'))
    .catch(err => {
      console.log(err);
      res.status(500);
      return res.end('error adding activity');
    });
});

router.delete('/activities/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;

  Custom_Activity.query(qb => {
    qb.where('id', id).andWhere('user_id', user_id);
  })
    .save({ is_deleted: true }, { patch: true })
    .then(() => res.end('successfully deleted activity'))
    .catch(err => {
      res.status(500);
      return res.end('error deleting emotion');
    });
});

module.exports = router;
