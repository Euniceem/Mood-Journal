exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entry_emotions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('entry_emotions').insert([
        { id: 1, entry_id: 1, emotion_id: 1, percent: 70 },
        { id: 2, entry_id: 1, emotion_id: 2, percent: 30 },
        { id: 3, entry_id: 2, emotion_id: 3, percent: 80 },
        { id: 4, entry_id: 2, emotion_id: 4, percent: 20 },
        { id: 5, entry_id: 3, emotion_id: 5, percent: 90 },
        { id: 6, entry_id: 3, emotion_id: 6, percent: 10 }
      ]);
    });
};
