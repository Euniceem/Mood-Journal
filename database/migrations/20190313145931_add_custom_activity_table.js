exports.up = function(knex, Promise) {
  return knex.schema.createTable('custom_activities', table => {
    table.increments();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable();
    table.string('name').notNullable();
    table.boolean('is_displayed').notNullable();
    table.boolean('is_deleted').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('custom_activities');
};
