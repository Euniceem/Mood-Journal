exports.up = function(knex, Promise) {
  return knex.schema.alterTable('entry_emotions', table => {
    table
      .integer('custom_emotion_id')
      .references('id')
      .inTable('custom_emotions');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('entry_emotions', table => {
    table.dropColumn('custom_emotion_id');
  });
};
