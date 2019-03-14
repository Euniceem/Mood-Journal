exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('default_activities')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('default_activities').insert([
        { name: 'work', is_displayed: true },
        { name: 'school', is_displayed: true },
        { name: 'relaxation', is_displayed: true },
        { name: 'friends', is_displayed: true },
        { name: 'sports', is_displayed: true },
        { name: 'party', is_displayed: true },
        { name: 'movies', is_displayed: true },
        { name: 'reading', is_displayed: true },
        { name: 'shopping', is_displayed: true },
        { name: 'travel', is_displayed: true }
      ]);
    });
};
