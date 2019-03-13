exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('emotions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('emotions').insert([
        { id: 1, name: 'energy' },
        { id: 2, name: 'happiness' },
        { id: 3, name: 'focus' },
        { id: 4, name: 'excitment' },
        { id: 5, name: 'enjoyment' },
        { id: 6, name: 'relaxation' },
        { id: 7, name: 'calmness' },
        { id: 8, name: 'fatigue' },
        { id: 9, name: 'boredom' },
        { id: 10, name: 'sadness' },
        { id: 11, name: 'stress' },
        { id: 12, name: 'anxiety' }
      ]);
    });
};
