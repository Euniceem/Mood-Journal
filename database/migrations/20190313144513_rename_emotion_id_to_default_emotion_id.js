exports.up = function(knex, Promise) {
  return knex.schema.alterTable('entry_emotions', table => {
    table.renameColumn('emotion_id', 'default_emotion_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('entry_emotions', table => {
    table.renameColumn('default_emotion_id', 'emotion_id');
  });
};
