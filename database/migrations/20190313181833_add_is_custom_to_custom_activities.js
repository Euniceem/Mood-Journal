exports.up = function(knex, Promise) {
  return knex.schema.alterTable('custom_activities', table => {
    table
      .boolean('is_custom')
      .notNullable()
      .defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('custom_activities', table => {
    table.dropColumn('is_custom');
  });
};
