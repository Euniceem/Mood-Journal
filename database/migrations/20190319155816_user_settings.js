
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_settings', function (table) {
    table.increments().primary().unique().notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.string('homepage');
    table.string('chosen_emotion_1');
    table.string('chosen_emotion_2');
    table.string('chosen_emotion_3');
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user_settings');
};
