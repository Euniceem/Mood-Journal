exports.up = function(knex, Promise) {
  return knex.schema.alterTable('entry_activities', table => {
    table.renameColumn('activity_id', 'default_activity_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('entry_activities', table => {
    table.renameColumn('default_activity_id', 'activity_id');
  });
};
