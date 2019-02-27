
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('image');
    table.string('description', 1024).notNullable();
    table.integer('price');
    table.string('manufacturer');
    table.string('model');
    table.integer('length');
    table.integer('width');
    table.integer('height');
    table.string('notes');
    table.integer('views').notNullable();
    table.integer('created_by').references('id').inTable('users');
    table.integer('status_id').references('id').inTable('statuses');
    table.integer('category_id').references('id').inTable('categories');
    table.integer('condition_id').references('id').inTable('conditions');
    table.timestamps(true, true);
  }) 
};

 exports.down = function(knex, Promise) {
   return knex.schema.dropTable('items')
 };
 