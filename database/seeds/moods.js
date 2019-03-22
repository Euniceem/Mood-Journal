exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('moods')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('moods').insert([
        { id: 1, name: 'Awful' },
        { id: 2, name: 'Bad' },
        { id: 3, name: 'Average' },
        { id: 4, name: 'Good' },
        { id: 5, name: 'Amazing' }
      ]);
    });
};
