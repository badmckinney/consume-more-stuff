
exports.up = function(knex, Promise) {
 return knex.schema.alterTable('items', (table) => {
  table.integer('created_by').notNullable().alter();
  table.integer('status_id').notNullable().alter();
  table.integer('category_id').notNullable().alter();
  table.integer('condition_id').notNullable().alter();
 }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('items', (table) => {
    table.integer('created_by').nullable().alter();
    table.integer('status_id').nullable().alter();
    table.integer('category_id').nullable().alter();
    table.integer('condition_id').nullable().alter();
   })  
};
