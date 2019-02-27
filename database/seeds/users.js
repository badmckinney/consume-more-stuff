
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'someguy@dakine.com',
          password: 'password',
          username: 'someguy',
          first_name: "some",
          last_name: 'guy'
        },
        {
          email: 'datguy@dakine.com',
          password: 'password',
          username: 'datguy',
          first_name: "dat",
          last_name: 'guy'
        },
        {
          email: 'holyguy@dakine.com',
          password: 'password',
          username: 'holuguy',
          first_name: "holy",
          last_name: 'guy'
        },
        {
          email: 'braddahguy@dakine.com',
          password: 'password',
          username: 'braddahguy',
          first_name: "braddah",
          last_name: 'guy'
        },
        {
          email: 'george@dakine.com',
          password: 'password',
          username: 'george',
          first_name: "george",
          last_name: 'dakine'
        },
        
      ]);
    });
};
