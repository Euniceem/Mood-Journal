exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entry_activities')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('entry_activities').insert([
        { id: 1, entry_id: 1, activity_id: 1 },
        { id: 2, entry_id: 1, activity_id: 2 },
        { id: 3, entry_id: 2, activity_id: 3 },
        { id: 4, entry_id: 2, activity_id: 4 },
        { id: 5, entry_id: 3, activity_id: 5 },
        { id: 6, entry_id: 3, activity_id: 6 }
      ]);
    });
};
