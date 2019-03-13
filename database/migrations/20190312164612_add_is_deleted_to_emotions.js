exports.up = function(knex, Promise) {
  return knex.schema.alterTable('emotions', table => {
    table
      .boolean('is_deleted')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('emotions', table => {
    table.dropColumn('is_deleted');
  });
};
