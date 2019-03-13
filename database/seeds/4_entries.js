exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entries')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('entries').insert([
        { id: 1, user_id: 1, mood_id: 1, notes: 'test notes 1' },
        { id: 2, user_id: 1, mood_id: 3, notes: 'test notes 2' },
        { id: 3, user_id: 1, mood_id: 5, notes: 'test notes 3' }
      ]);
    });
};
