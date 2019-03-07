exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('categories').insert([
        {
          name: 'apparel'
        },
        {
          name: 'appliances'
        },
        {
          name: 'automotive'
        },
        {
          name: 'electronics'
        },
        {
          name: 'furniture'
        },
        {
          name: 'jewelry'
        },
        {
          name: 'musical_instruments'
        },
        {
          name: 'sporting_goods'
        },
        {
          name: 'other'
        },
        {
          name: 'wanted'
        }
      ]);
    });
};
