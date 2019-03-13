exports.up = function(knex, Promise) {
  return knex.schema.createTable('entry_emotions', table => {
    table.increments();
    table
      .integer('entry_id')
      .references('id')
      .inTable('entries');
    table
      .integer('emotion_id')
      .references('id')
      .inTable('emotions');
    table.integer('percent').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entry_emotions');
};
