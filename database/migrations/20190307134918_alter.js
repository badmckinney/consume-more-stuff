
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('items', (table) => {
    table.string('length').alter();
    table.string('width').alter();
    table.string('height').alter();
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('items', (table) => {
    table.integer('length').alter();
    table.integer('width').alter();
    table.integer('height').alter();
  })
  
};
