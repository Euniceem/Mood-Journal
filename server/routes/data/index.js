const express = require('express');
const router = express.Router();
const Entry = require('../../../database/models/Entry');
const isAuthenticated = require('../isAuth');

router.get('/data', isAuthenticated, (req, res) => {
  const user_id = req.user.id;

  Entry.where('user_id', user_id)
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

      entries = entries.toJSON();

      let groupByDayOfWeek = entries.reduce(
        (grouping, currentEntry) => {
          let day = currentEntry.created_at.getDay();
          let mood = currentEntry.mood_id;

          let updatedActivitiesCount = currentEntry.entryActivities.reduce(
            (prevActivities, currentActivity) => {
              let activityName = currentActivity.custom_activity
                ? currentActivity.custom_activity.name
                : currentActivity.default_activity.name;

              return Object.assign({}, prevActivities, {
                [activityName]: prevActivities.hasOwnProperty(activityName)
                  ? ++prevActivities[activityName]
                  : 1
              });
            },
            grouping[day].activities
          );

          let updatedEmotionTotal = currentEntry.entryEmotions.reduce(
            (prevEmotionSums, currentEmotion) => {
              let emotionName = currentEmotion.custom_emotion
                ? currentEmotion.custom_emotion.name
                : currentEmotion.default_emotion.name;

              return Object.assign({}, prevEmotionSums, {
                [emotionName]: prevEmotionSums.hasOwnProperty(emotionName)
                  ? (prevEmotionSums[emotionName] += currentEmotion.percent)
                  : currentEmotion.percent
              });
            },
            grouping[day].emotions
          );

          return Object.assign({}, grouping, {
            [day]: Object.assign({}, grouping[day], {
              moodSum: grouping[day].moodSum + mood,
              activities: updatedActivitiesCount,
              emotions: updatedEmotionTotal,
              totalEntries: ++grouping[day].totalEntries
            })
          });
        },
        {
          0: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          1: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          2: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          3: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          4: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          5: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          6: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          }
        }
      );

      let groupByHour = entries.reduce(
        (grouping, currentEntry) => {
          let hour = currentEntry.created_at.getHours();
          let mood = currentEntry.mood_id;

          let updatedActivitiesCount = currentEntry.entryActivities.reduce(
            (prevActivities, currentActivity) => {
              let activityName = currentActivity.custom_activity
                ? currentActivity.custom_activity.name
                : currentActivity.default_activity.name;

              return Object.assign({}, prevActivities, {
                [activityName]: prevActivities.hasOwnProperty(activityName)
                  ? ++prevActivities[activityName]
                  : 1
              });
            },
            grouping[hour].activities
          );

          let updatedEmotionTotal = currentEntry.entryEmotions.reduce(
            (prevEmotionSums, currentEmotion) => {
              let emotionName = currentEmotion.custom_emotion
                ? currentEmotion.custom_emotion.name
                : currentEmotion.default_emotion.name;

              return Object.assign({}, prevEmotionSums, {
                [emotionName]: prevEmotionSums.hasOwnProperty(emotionName)
                  ? (prevEmotionSums[emotionName] += currentEmotion.percent)
                  : currentEmotion.percent
              });
            },
            grouping[hour].emotions
          );

          return Object.assign({}, grouping, {
            [hour]: Object.assign({}, grouping[hour], {
              moodSum: grouping[hour].moodSum + mood,
              activities: updatedActivitiesCount,
              emotions: updatedEmotionTotal,
              totalEntries: ++grouping[hour].totalEntries
            })
          });
        },
        {
          0: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          1: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          2: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          3: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          4: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          5: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          6: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          7: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          8: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          9: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          10: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          11: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          12: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          13: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          14: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          15: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          16: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          17: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          18: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          19: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          20: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          21: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          22: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          },
          23: {
            moodSum: 0,
            activities: {},
            emotions: {},
            totalEntries: 0
          }
        }
      );

      for (let day in groupByDayOfWeek) {
        if (groupByDayOfWeek[day].totalEntries === 0) {
          break;
        }

        groupByDayOfWeek[day].moodSum =
          groupByDayOfWeek[day].moodSum / groupByDayOfWeek[day].totalEntries;

        for (let activity in groupByDayOfWeek[day].activities) {
          groupByDayOfWeek[day].activities[activity] =
            groupByDayOfWeek[day].activities[activity] /
            groupByDayOfWeek[day].totalEntries;
        }

        for (let emotion in groupByDayOfWeek[day].emotions) {
          groupByDayOfWeek[day].emotions[emotion] =
            groupByDayOfWeek[day].emotions[emotion] /
            groupByDayOfWeek[day].totalEntries;
        }
      }

      for (let hour in groupByHour) {
        if (groupByHour[hour].totalEntries === 0) {
          break;
        }

        groupByHour[hour].moodSum =
          groupByHour[hour].moodSum / groupByHour[hour].totalEntries;

        for (let activity in groupByHour[hour].activities) {
          groupByHour[hour].activities[activity] =
            groupByHour[hour].activities[activity] /
            groupByHour[hour].totalEntries;
        }

        for (let emotion in groupByHour[hour].emotions) {
          groupByHour[hour].emotions[emotion] =
            groupByHour[hour].emotions[emotion] /
            groupByHour[hour].totalEntries;
        }
      }

      res.json({ avgWeek: groupByDayOfWeek, avgDay: groupByHour });
    })
    .catch(err => {
      console.log(err);
      res.status(500);
      return res.end('error fetching entry');
    });
});

module.exports = router;
