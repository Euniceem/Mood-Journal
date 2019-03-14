exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('default_emotions')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('default_emotions').insert([
        { name: 'energy', is_displayed: true },
        { name: 'happiness', is_displayed: true },
        { name: 'focus', is_displayed: true },
        { name: 'excitment', is_displayed: false },
        { name: 'enjoyment', is_displayed: false },
        { name: 'relaxation', is_displayed: false },
        { name: 'calmness', is_displayed: false },
        { name: 'fatigue', is_displayed: false },
        { name: 'boredom', is_displayed: false },
        { name: 'sadness', is_displayed: false },
        { name: 'stress', is_displayed: false },
        { name: 'anxiety', is_displayed: false }
      ]);
    });
};
