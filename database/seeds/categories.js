
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          name:"Apparel"
        },
        {
          name:"Appliances"
        },
        {
          name:"Automotive"
        },
        {
          name:"Electronics"
        },
        {
          name:"Furniture"
        },
        {
          name:"Jewelry"
        },
        {
          name:"Musical_Instruments"
        },
        {
          name:"Sporting_goods"
        },
        {
          name:"View_All"
        },
        {
          name:"Wanted"
        }
      ]);
    });
};
