exports.up = function(knex, Promise) {
  return knex.schema.createTable('emotions', table => {
    table.increments();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('emotions');
};
