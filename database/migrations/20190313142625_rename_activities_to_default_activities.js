exports.up = function(knex, Promise) {
  return knex.schema.renameTable('activities', 'default_activities');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('default_activities', 'activities');
};
