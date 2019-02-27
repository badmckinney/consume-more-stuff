
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('conditions').insert([
        {
          name: "poor",
        },
        {
          name: "fair",
        },
        {
          name: "great",
        },
        {
          name: "excellent",
        },
        {
          name: "like new in box",
        }
      ]);
    });
};
