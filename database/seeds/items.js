
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        { 
        name: "item1",
        image: "one fat image",
        description: "super long description describing the item",
        price: 5,
        manufacturer: "jose",
        model: "x4-20",
        length: 5,
        width: 2,
        height: 6,
        notes: "buggah cherry",
        views: 0
        },
        { 
        name: "item2",
        image: "one kinda fat image",
        description: "super long description describing the item",
        price: 1,
        manufacturer: "jose's brother",
        model: "x4-21",
        length: 2,
        width: 5,
        height: 6,
        notes: "buggah not so cherry",
        views: 99
        },
        { 
        name: "item3",
        image: "one fat image",
        description: "super long description describing the item",
        price: 5,
        manufacturer: "jose's mom",
        model: "x4-20 blaze it",
        length: 4,
        width: 2,
        height: 0,
        notes: "buggah is prime",
        views: 0
        },
        { 
        name: "item4",
        image: "one shmall image",
        description: "super long description describing the item",
        price: 5,
        manufacturer: "jose2",
        model: "x4-22",
        length: 5,
        width: 2,
        height: 6,
        notes: "small kine bus up",
        views: 123123
        },
      ]);
    });
};
