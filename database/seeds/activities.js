exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('activities')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('activities').insert([
        { id: 1, name: 'work' },
        { id: 2, name: 'school' },
        { id: 3, name: 'relaxation' },
        { id: 4, name: 'friends' },
        { id: 5, name: 'sports' },
        { id: 6, name: 'party' },
        { id: 7, name: 'movies' },
        { id: 8, name: 'reading' },
        { id: 9, name: 'shopping' },
        { id: 10, name: 'travel' }
      ]);
    });
};
