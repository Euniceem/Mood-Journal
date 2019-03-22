exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('default_activities')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('default_activities').insert([
        { name: 'work' },
        { name: 'school' },
        { name: 'relaxation' },
        { name: 'friends' },
        { name: 'sports' }
      ]);
    });
};
