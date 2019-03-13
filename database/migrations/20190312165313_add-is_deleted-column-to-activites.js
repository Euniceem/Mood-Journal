exports.up = function(knex, Promise) {
  return knex.schema.alterTable('activities', table => {
    table
      .boolean('is_deleted')
      .notNullable()
      .defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('activities', table => {
    table.dropColumn('is_deleted');
  });
};
