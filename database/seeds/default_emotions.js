exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('default_emotions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('default_emotions').insert([
        { name: 'energy' },
        { name: 'happiness' },
        { name: 'anxiety' },
        { name: 'stress' }
      ]);
    });
};
