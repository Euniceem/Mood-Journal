const express = require('express');
const router = express.Router();
const knex = require('../../../database/knex');
const isAuthenticated = require('../isAuth');

const mapDaytoString = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat'
};

const mapHourToString = {
  0: '12am',
  1: '1am',
  2: '2am',
  3: '3am',
  4: '4am',
  5: '5am',
  6: '6am',
  7: '7am',
  8: '8am',
  9: '9am',
  10: '10am',
  11: '11am',
  12: '12pm',
  13: '1pm',
  14: '2pm',
  15: '3pm',
  16: '4pm',
  17: '5pm',
  18: '6pm',
  19: '7pm',
  20: '8pm',
  21: '9pm',
  22: '10pm',
  23: '11pm'
};

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
      avgDay: {},
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
        row.time_label = mapHourToString[row.date_part];
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
            row.time_label = mapDaytoString[row.date_part];
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
        ORDER BY date_trunc('day', entries.created_at::date) DESC
        `
        )
        .then(result => {
          result.rows.forEach(row => {
            const isoDate = new Date(row.date_trunc);

            row.date = row.date_trunc;
            row.time_label = `${isoDate.getMonth() + 1}/${isoDate.getDate()}`;
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
            avgEmotionsByHour[hour].time_label = mapHourToString[hour];
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
            avgEmotionsByDayOfWeek[day].time_label = mapDaytoString[day];
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
      WHERE user_id = ${user_id} AND default_emotion_id IS NOT NULL
      GROUP BY date_trunc('day', entries.created_at::DATE), default_emotions.name
      ORDER BY date_trunc('day', entries.created_at::DATE) DESC
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
      ORDER BY date_trunc('day', entries.created_at::DATE) DESC
      `
        )
        .then(result => {
          result.rows.forEach(row => {
            avgEmotionsByDate[row.date_trunc]
              ? (avgEmotionsByDate[row.date_trunc][row.name] = row.avg)
              : (avgEmotionsByDate[row.date_trunc] = { [row.name]: row.avg });
          });

          for (let date in avgEmotionsByDate) {
            const isoDate = new Date(date);

            avgEmotionsByDate[date].date = date;
            avgEmotionsByDate[date].time_label = `${isoDate.getMonth() +
              1}/${isoDate.getDate()}`;
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
        WHERE user_id = ${user_id} AND default_activity_id IS NOT NULL
        GROUP BY EXTRACT(DOW from entries.created_at::DATE), default_activities.name
        ORDER BY 1
        `
        )
        .then(result => {
          const totalActivities = {};
          const totalActivitiesByDayOfWeek = {};

          result.rows.forEach(row => {
            totalActivities[row.name]
              ? (totalActivities[row.name] += parseInt(row.count))
              : (totalActivities[row.name] = parseInt(row.count));

            totalActivitiesByDayOfWeek[row.date_part]
              ? (totalActivitiesByDayOfWeek[row.date_part][row.name] = parseInt(
                  row.count
                ))
              : (totalActivitiesByDayOfWeek[row.date_part] = {
                  [row.name]: parseInt(row.count)
                });
          });

          return [totalActivities, totalActivitiesByDayOfWeek];
        });
    })
    .then(activityData => {
      const totalActivities = activityData[0];
      const totalActivitiesByDayOfWeek = activityData[1];

      return knex
        .raw(
          `
        SELECT EXTRACT(DOW from entries.created_at::DATE), custom_activities.name, count(*)
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
            totalActivities[row.name]
              ? (totalActivities[row.name] += parseInt(row.count))
              : (totalActivities[row.name] = parseInt(row.count));

            totalActivitiesByDayOfWeek[row.date_part]
              ? (totalActivitiesByDayOfWeek[row.date_part][row.name] = parseInt(
                  row.count
                ))
              : (totalActivitiesByDayOfWeek[row.date_part] = {
                  [row.name]: parseInt(row.count)
                });
          });

          data.activityData.avgDay = totalActivities;

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
        ORDER BY date_trunc('day', entries.created_at) DESC
        `
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
      ORDER BY date_trunc('day', entries.created_at) DESC`
        )
        .then(result => {
          let totalNumOfDays = 0;

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
            totalNumOfDays++;
          }

          return totalNumOfDays;
        });
    })
    .then(totalNumOfDays => {
      //calculate activity averages for day, and day of the week
      let totalNumOfWeeks = totalNumOfDays / 7;

      for (let activity in data.activityData.avgDay) {
        data.activityData.avgDay[activity] =
          data.activityData.avgDay[activity] / totalNumOfDays;
      }

      data.activityData.avgWeek.forEach(dayOfWeek => {
        for (let activity in dayOfWeek) {
          if (activity === 'day') {
            return;
          }

          dayOfWeek[activity] = dayOfWeek[activity] / totalNumOfWeeks;
        }
      });
    })
    .then(() => {
      res.json(data);
    })
    .catch(err => res.status(500).json({ error: 'error fetching data' }));
});

module.exports = router;
