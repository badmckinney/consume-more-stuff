
exports.up = function(knex, Promise) {
 return knex.schema.createTable('statuses', (table) => {
   table.increments();
   table.string('name').notNullable();
   table.timestamps(true, true);
 }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('statuses');
};
