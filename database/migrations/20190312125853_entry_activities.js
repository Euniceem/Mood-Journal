exports.up = function(knex, Promise) {
  return knex.schema.createTable('entry_activities', table => {
    table.increments();
    table
      .integer('entry_id')
      .references('id')
      .inTable('entries');
    table
      .integer('activity_id')
      .references('id')
      .inTable('activities');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entry_activities');
};
