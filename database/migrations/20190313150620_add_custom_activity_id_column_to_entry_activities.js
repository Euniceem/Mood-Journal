exports.up = function(knex, Promise) {
  return knex.schema.alterTable('entry_activities', table => {
    table
      .integer('custom_activity_id')
      .references('id')
      .inTable('custom_activities');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('entry_activities', table => {
    table.dropColumn('custom_activity_id');
  });
};
