
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          name:"cars"
        },
        {
          name:"boats"
        },
        {
          name:"surfboards"
        },
        {
          name:"golfclubs"
        },
        {
          name:"Runescape"
        },
      ]);
    });
};
