
exports.up = function(knex, Promise) {
 return knex.schema.alterTable('items', (table) => {
  table.integer('created_by').references('id').inTable('users').notNullable().alter();
  table.integer('status_id').references('id').inTable('statuses').notNullable().alter();
  table.integer('category_id').references('id').inTable('categories').notNullable().alter();
  table.integer('condition_id').references('id').inTable('conditions').notNullable().alter();
 }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('items', (table) => {
    table.integer('created_by').references('id').inTable('users').nullable().alter();
    table.integer('status_id').references('id').inTable('statuses').nullable().alter();
    table.integer('category_id').references('id').inTable('categories').nullable().alter();
    table.integer('condition_id').references('id').inTable('conditions').nullable().alter();
   })  
};
