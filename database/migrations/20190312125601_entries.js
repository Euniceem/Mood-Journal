exports.up = function(knex, Promise) {
  return knex.schema.createTable('entries', table => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users');
    table
      .integer('mood_id')
      .references('id')
      .inTable('moods');
    table.string('notes', 1024);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries');
};
