const express = require('express');
const router = express.Router();
const knex = require('../../../database/knex');
const isAuthenticated = require('../isAuth');

router.get('/data', isAuthenticated, (req, res) => {
  const user_id = req.user.id;
  const data = {
    moodData: {
      avgDay: [],
      avgWeek: [],
      allDays: []
    },
    emotionData: {
      avgDay: [],
      avgWeek: [],
      allDays: []
    },
    activityData: {
      avgDay: [],
      avgWeek: [],
      allDays: []
    }
  };

  /***
   * mood data
   *
   */

  // by hour
  knex
    .raw(
      `
    SELECT date_part('hour', entries.created_at), avg(mood_id)
    FROM entries
    WHERE entries.user_id = ${user_id} 
    GROUP BY date_part('hour', entries.created_at)
    ORDER BY 1
  `
    )
    .then(result => {
      result.rows.forEach(row => {
        data.moodData.avgDay.push(row);
      });
    })
    .then(() => {
      // by day of week
      return knex
        .raw(
          `
        SELECT EXTRACT(DOW from entries.created_at::DATE), avg(mood_id)
        FROM entries
        WHERE user_id = ${user_id}
        GROUP BY EXTRACT(DOW from entries.created_at::DATE)
        ORDER BY 1
        `
        )
        .then(result => {
          result.rows.forEach(row => {
            data.moodData.avgWeek.push(row);
          });
        });
    })
    .then(() => {
      // by date
      return knex
        .raw(
          `
        SELECT date_trunc('day', entries.created_at::date), avg(mood_id)
        FROM entries
        WHERE entries.user_id = ${user_id} 
        GROUP BY date_trunc('day', entries.created_at::date)
        ORDER BY 1
        `
        )
        .then(result => {
          result.rows.forEach(row => {
            data.moodData.allDays.push(row);
          });
        });
    })
    .then(() => {
      /*****
       * emotion data
       */

      //by hour
      return knex
        .raw(
          `
      SELECT date_part('hour', entries.created_at), default_emotions.name, avg(percent)
      FROM entry_emotions
      INNER JOIN entries
      ON entry_emotions.entry_id = entries.id
      INNER JOIN default_emotions
      ON entry_emotions.default_emotion_id = default_emotions.id
      WHERE entries.user_id = ${user_id} AND default_emotion_id IS NOT NULL
      GROUP BY date_part('hour', entries.created_at), default_emotions.name
      ORDER BY 1
      `
        )
        .then(result => {
          const avgEmotionsByHour = {};

          result.rows.forEach(row => {
            avgEmotionsByHour[row.date_part]
              ? (avgEmotionsByHour[row.date_part][row.name] = row.avg)
              : (avgEmotionsByHour[row.date_part] = { [row.name]: row.avg });
          });

          return avgEmotionsByHour;
        });
    })
    .then(avgEmotionsByHour => {
      return knex
        .raw(
          `
      SELECT date_part('hour', entries.created_at), custom_emotions.name, avg(percent)
      FROM entry_emotions
      INNER JOIN entries
      ON entry_emotions.entry_id = entries.id
      INNER JOIN custom_emotions
      ON entry_emotions.custom_emotion_id = custom_emotions.id
      WHERE entries.user_id = ${user_id} AND custom_emotion_id IS NOT NULL
      GROUP BY date_part('hour', entries.created_at), custom_emotions.name
      ORDER BY 1
      `
        )
        .then(result => {
          result.rows.forEach(row => {
            avgEmotionsByHour[row.date_part]
              ? (avgEmotionsByHour[row.date_part][row.name] = row.avg)
              : (avgEmotionsByHour[row.date_part] = { [row.name]: row.avg });
          });

          for (let hour in avgEmotionsByHour) {
            avgEmotionsByHour[hour].hour = hour;
            data.emotionData.avgDay.push(avgEmotionsByHour[hour]);
          }
        });
    })
    .then(() => {
      //by day of week
      return knex
        .raw(
          `
      SELECT EXTRACT(DOW from entries.created_at::DATE), default_emotions.name, avg(percent)
      FROM entry_emotions
      INNER JOIN entries
      ON entry_emotions.entry_id = entries.id
      INNER JOIN default_emotions
      ON entry_emotions.default_emotion_id = default_emotions.id
      WHERE user_id = ${user_id} AND default_emotion_id IS NOT NULL
      GROUP BY EXTRACT(DOW from entries.created_at::DATE), default_emotions.name
      ORDER BY 1
      `
        )
        .then(result => {
          const avgEmotionsByDayOfWeek = {};

          result.rows.forEach(row => {
            avgEmotionsByDayOfWeek[row.date_part]
              ? (avgEmotionsByDayOfWeek[row.date_part][row.name] = row.avg)
              : (avgEmotionsByDayOfWeek[row.date_part] = {
                  [row.name]: row.avg
                });
          });

          return avgEmotionsByDayOfWeek;
        });
    })
    .then(avgEmotionsByDayOfWeek => {
      return knex
        .raw(
          `
      SELECT EXTRACT(DOW from entries.created_at::DATE), custom_emotions.name, avg(percent)
      FROM entry_emotions
      INNER JOIN entries
      ON entry_emotions.entry_id = entries.id
      INNER JOIN custom_emotions
      ON entry_emotions.custom_emotion_id = custom_emotions.id
      WHERE entries.user_id = ${user_id} AND custom_emotion_id IS NOT NULL
      GROUP BY EXTRACT(DOW from entries.created_at::DATE), custom_emotions.name
      ORDER BY 1
      `
        )
        .then(result => {
          result.rows.forEach(row => {
            avgEmotionsByDayOfWeek[row.date_part]
              ? (avgEmotionsByDayOfWeek[row.date_part][row.name] = row.avg)
              : (avgEmotionsByDayOfWeek[row.date_part] = {
                  [row.name]: row.avg
                });
          });

          for (let day in avgEmotionsByDayOfWeek) {
            avgEmotionsByDayOfWeek[day].day = day;
            data.emotionData.avgWeek.push(avgEmotionsByDayOfWeek[day]);
          }
        });
    })
    .then(() => {
      // by date
      return knex
        .raw(
          `
      SELECT date_trunc('day', entries.created_at::DATE), default_emotions.name, avg(percent)
      FROM entry_emotions
      INNER JOIN entries
      ON entry_emotions.entry_id = entries.id
      INNER JOIN default_emotions
      ON entry_emotions.default_emotion_id = default_emotions.id
      WHERE user_id = 1 AND default_emotion_id IS NOT NULL
      GROUP BY date_trunc('day', entries.created_at::DATE), default_emotions.name
      ORDER BY 1
      `
        )
        .then(result => {
          const avgEmotionsByDate = {};

          result.rows.forEach(row => {
            avgEmotionsByDate[row.date_trunc]
              ? (avgEmotionsByDate[row.date_trunc][row.name] = row.avg)
              : (avgEmotionsByDate[row.date_trunc] = { [row.name]: row.avg });
          });

          return avgEmotionsByDate;
        });
    })
    .then(avgEmotionsByDate => {
      return knex
        .raw(
          `
      SELECT date_trunc('day', entries.created_at::DATE), custom_emotions.name, avg(percent)
      FROM entry_emotions
      INNER JOIN entries
      ON entry_emotions.entry_id = entries.id
      INNER JOIN custom_emotions
      ON entry_emotions.custom_emotion_id = custom_emotions.id
      WHERE entries.user_id = ${user_id} AND custom_emotion_id IS NOT NULL
      GROUP BY date_trunc('day', entries.created_at::DATE), custom_emotions.name
      ORDER BY 1
      `
        )
        .then(result => {
          result.rows.forEach(row => {
            avgEmotionsByDate[row.date_trunc]
              ? (avgEmotionsByDate[row.date_trunc][row.name] = row.avg)
              : (avgEmotionsByDate[row.date_trunc] = { [row.name]: row.avg });
          });

          for (let date in avgEmotionsByDate) {
            avgEmotionsByDate[date].date = date;
            data.emotionData.allDays.push(avgEmotionsByDate[date]);
          }
        });
    })
    .then(() => {
      /****
       * activity data
       */

      //by day of week
      return knex
        .raw(
          `
        SELECT EXTRACT(DOW from entries.created_at::DATE), default_activities.name, count(*)
        FROM entry_activities
        INNER JOIN entries
        ON entry_activities.entry_id = entries.id
        INNER JOIN default_activities
        ON entry_activities.default_activity_id = default_activities.id
        WHERE user_id = 1 AND default_activity_id IS NOT NULL
        GROUP BY EXTRACT(DOW from entries.created_at::DATE), default_activities.name
        ORDER BY 1
        `
        )
        .then(result => {
          const totalActivitiesByDayOfWeek = {};

          result.rows.forEach(row => {
            totalActivitiesByDayOfWeek[row.date_part]
              ? (totalActivitiesByDayOfWeek[row.date_part][row.name] =
                  row.count)
              : (totalActivitiesByDayOfWeek[row.date_part] = {
                  [row.name]: row.count
                });
          });

          return totalActivitiesByDayOfWeek;
        });
    })
    .then(totalActivitiesByDayOfWeek => {
      return knex
        .raw(
          `SELECT EXTRACT(DOW from entries.created_at::DATE), custom_activities.name, count(*)
        FROM entry_activities
        INNER JOIN entries
        ON entry_activities.entry_id = entries.id
        INNER JOIN custom_activities
        ON entry_activities.custom_activity_id = custom_activities.id
        WHERE entries.user_id = ${user_id} AND custom_activity_id IS NOT NULL
        GROUP BY EXTRACT(DOW from entries.created_at::DATE), custom_activities.name
        ORDER BY 1`
        )
        .then(result => {
          result.rows.forEach(row => {
            totalActivitiesByDayOfWeek[row.date_part]
              ? (totalActivitiesByDayOfWeek[row.date_part][row.name] =
                  row.count)
              : (totalActivitiesByDayOfWeek[row.date_part] = {
                  [row.name]: row.count
                });
          });

          for (let day in totalActivitiesByDayOfWeek) {
            totalActivitiesByDayOfWeek[day].day = day;
            data.activityData.avgWeek.push(totalActivitiesByDayOfWeek[day]);
          }
        });
    })
    .then(() => {
      // by date

      return knex
        .raw(
          `SELECT date_trunc('day', entries.created_at), default_activities.name, count(*)
      FROM entry_activities
      INNER JOIN entries
      ON entry_activities.entry_id = entries.id
      INNER JOIN default_activities
      ON entry_activities.default_activity_id = default_activities.id
      WHERE entries.user_id = ${user_id} AND default_activity_id IS NOT NULL
      GROUP BY date_trunc('day', entries.created_at), default_activities.name
      ORDER BY 1`
        )
        .then(result => {
          const totalActivitiesByDate = {};

          result.rows.forEach(row => {
            totalActivitiesByDate[row.date_trunc]
              ? (totalActivitiesByDate[row.date_trunc][row.name] = row.count)
              : (totalActivitiesByDate[row.date_trunc] = {
                  [row.name]: row.count
                });
          });

          return totalActivitiesByDate;
        });
    })
    .then(totalActivitiesByDate => {
      return knex
        .raw(
          `SELECT date_trunc('day', entries.created_at), custom_activities.name, count(*)
      FROM entry_activities
      INNER JOIN entries
      ON entry_activities.entry_id = entries.id
      INNER JOIN custom_activities
      ON entry_activities.custom_activity_id = custom_activities.id
      WHERE entries.user_id = ${user_id} AND custom_activity_id IS NOT NULL
      GROUP BY date_trunc('day', entries.created_at), custom_activities.name
      ORDER BY 1`
        )
        .then(result => {
          result.rows.forEach(row => {
            totalActivitiesByDate[row.date_trunc]
              ? (totalActivitiesByDate[row.date_trunc][row.name] = row.count)
              : (totalActivitiesByDate[row.date_trunc] = {
                  [row.name]: row.count
                });
          });

          for (let date in totalActivitiesByDate) {
            totalActivitiesByDate[date].date = date;
            data.activityData.allDays.push(totalActivitiesByDate[date]);
          }
        });
    })
    .then(() => {
      res.json(data);
    })
    .catch(err => res.status(500).json({ error: 'error fetching data' }));
});

module.exports = router;
