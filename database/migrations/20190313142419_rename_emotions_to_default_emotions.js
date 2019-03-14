exports.up = function(knex, Promise) {
  return knex.schema.renameTable('emotions', 'default_emotions');
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('default_emotions', 'emotions');
};
