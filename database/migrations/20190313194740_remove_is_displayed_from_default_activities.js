exports.up = function(knex, Promise) {
  return knex.schema.alterTable('default_activities', table => {
    table.dropColumn('is_displayed');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('default_activities', table => {
    table
      .boolean('is_displayed')
      .notNullable()
      .defaultTo(false);
  });
};
