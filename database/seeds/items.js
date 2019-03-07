
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {
          name: "item1",
          image: "",
          description: "super long description describing the item",
          price: 5,
          manufacturer: "jose",
          model: "x4-20",
          length: 5,
          width: 2,
          height: 6,
          notes: "buggah cherry",
          views: 0,
          created_by: 1,
          status_id: 1,
          category_id: 1,
          condition_id: 1
        },
        {
          name: "item2",
          image: "",
          description: "super long description describing the item",
          price: 1,
          manufacturer: "jose's brother",
          model: "x4-21",
          length: 2,
          width: 5,
          height: 6,
          notes: "buggah not so cherry",
          views: 99,
          created_by: 2,
          status_id: 2,
          category_id: 2,
          condition_id: 2
        },
        {
          name: "item3",
          image: "",
          description: "super long description describing the item",
          price: 5,
          manufacturer: "jose's mom",
          model: "x4-20 blaze it",
          length: 4,
          width: 2,
          height: 0,
          notes: "buggah is prime",
          views: 0,
          created_by: 5,
          status_id: 1,
          category_id: 2,
          condition_id: 2
        },
        {
          name: "item4",
          image: "",
          description: "super long description describing the item",
          price: 5,
          manufacturer: "jose2",
          model: "x4-22",
          length: 5,
          width: 2,
          height: 6,
          notes: "small kine bus up",
          views: 123123,
          created_by: 2,
          status_id: 2,
          category_id: 2,
          condition_id: 3
        },
      ]);
    });
};
