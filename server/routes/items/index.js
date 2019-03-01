const express = require('express');
const router = express.Router();
const Item = require('../../../database/models/Item');
const Category = require('../../../database/models/Category');
const Condition = require('../../../database/models/Condition');
const ItemStatus = require('../../../database/models/ItemStatus');
const User = require('../../../database/models/User');

/************************
 *  GET
 ************************/

router.get('/items', (req, res) => {
  Item.fetchAll({
    withRelated: ['createdBy', 'category', 'condition', 'status']
  })
    .then(items => {
      itemList = items.models;
      items = [];

      itemList.forEach(item => {
        item = item.attributes;
        const relations = item.relations;
        const condition = relations.condition.attributes;
        const category = relations.category.attributes;
        const createdBy = relations.createdBy.attributes;
        const status = relations.status.attributes;

        const itemData = {
          id: item.id,
          created_by: createdBy.username,
          status: status.name,
          category: category.name,
          condition: condition.name,
          name: item.name,
          image: item.image,
          description: item.description,
          price: item.price,
          manufacturer: item.manufacturer,
          model: item.model,
          dimensions: item.dimensions,
          created_at: item.created_at,
          updated_at: item.updated_at,
          notes: item.notes,
          views: item.views
        };

        items.push(itemData);
      });
      res.json(items);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

router.get('/items/category/:category', (req, res) => {
  const category_name = req.params.category;
  new Category({ name: category_name }).fetch()
    .then(category => {
      category = category.toJSON();

      new Item({ category_id: category.id }).fetchAll({
        withRelated: ['createdBy', 'category', 'condition', 'status']
      })
        .then(items => {
          itemList = items.toJSON();
          items = [];

          itemList.forEach(item => {

            const itemData = {
              id: item.id,
              created_by: item.created_by.username,
              status: item.status.name,
              category: item.category.name,
              condition: item.condition.name,
              name: item.name,
              image: item.image,
              description: item.description,
              price: item.price,
              manufacturer: item.manufacturer,
              model: item.model,
              dimensions: item.dimensions,
              created_at: item.created_at,
              updated_at: item.updated_at,
              notes: item.notes,
              views: item.views
            }

            items.push(itemData);
          });
          res.json(items);
        })
        .catch(err => {
          res.status(500);
          res.json(err);
        });
    });
});

router.get('/items/status/:status', (req, res) => {
  const status_id = req.params.status;

  Item.where({ status_id: status_id })
    .fetchAll({
      withRelated: ['createdBy', 'category', 'condition', 'status']
    })
    .then(items => {
      itemList = items.models;
      items = [];

      itemList.forEach(item => {
        item = item.attributes;
        const relations = item.relations;
        const condition = relations.condition.attributes;
        const category = relations.category.attributes;
        const createdBy = relations.createdBy.attributes;
        const status = relations.status.attributes;

        const itemData = {
          id: item.id,
          created_by: createdBy.username,
          status: status.name,
          category: category.name,
          condition: condition.name,
          name: item.name,
          image: item.image,
          description: item.description,
          price: item.price,
          manufacturer: item.manufacturer,
          model: item.model,
          dimensions: item.dimensions,
          created_at: item.created_at,
          updated_at: item.updated_at,
          notes: item.notes,
          views: item.views
        };

        items.push(itemData);
      });
      res.json(items);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

router.get('/items/search/:term', (req, res) => {
  let term = req.params.term;

  Item.whereRaw('LOWER(name) LIKE ?', '%' + term.toLowerCase() + '%')
    .orWhereRaw('LOWER(description) LIKE ?', '%' + term.toLowerCase() + '%')
    .orWhereRaw('LOWER(manufacturer) LIKE ?', '%' + term.toLowerCase() + '%')
    .orWhereRaw('LOWER(model) LIKE ?', '%' + term.toLowerCase() + '%')
    .orWhereRaw('LOWER(notes) LIKE ?', '%' + term.toLowerCase() + '%')
    .fetchAll({
      withRelated: ['createdBy', 'category', 'condition', 'status']
    })
    .then(items => {
      itemList = items.models;
      items = [];

      itemList.forEach(item => {
        item = item.attributes;
        const relations = item.relations;
        const condition = relations.condition.attributes;
        const category = relations.category.attributes;
        const createdBy = relations.createdBy.attributes;
        const status = relations.status.attributes;

        const itemData = {
          id: item.id,
          created_by: createdBy.username,
          status: status.name,
          category: category.name,
          condition: condition.name,
          name: item.name,
          image: item.image,
          description: item.description,
          price: item.price,
          manufacturer: item.manufacturer,
          model: item.model,
          length: item.length,
          width: item.width,
          height: item.height,
          created_at: item.created_at,
          updated_at: item.updated_at,
          notes: item.notes,
          views: item.views
        };

        items.push(itemData);
      });
      res.json(items);
    })
    .catch(err => {
      res.status(500);
      res.json(err);
    });
});

router.get('/items/:id', (req, res) => {
  const id = req.params.id;

  Item.where({ id: id }).fetch({
    withRelated: ['createdBy', 'category', 'condition', 'status']
  })
    .then((item) => {
      if (!item) {
        res.status(400);
        res.json({ error: 'That item does not exist' });
      }

      item = item.attributes;
      const relations = item.relations;
      const condition = relations.condition.attributes;
      const category = relations.category.attributes;
      const createdBy = relations.createdBy.attributes;
      const status = relations.status.attributes;

      const itemData = {
        id: item.id,
        created_by: createdBy.username,
        status: status.name,
        category: category.name,
        condition: condition.name,
        name: item.name,
        image: item.image,
        description: item.description,
        price: item.price,
        manufacturer: item.manufacturer,
        model: item.model,
        dimensions: item.dimensions,
        created_at: item.created_at,
        updated_at: item.updated_at,
        notes: item.notes,
        views: item.views
      }

      res.json(itemData);
    }).catch((err) => {
      res.status(500);
      res.json(err);
    });
});

/************************
 * POST
 ************************/

router.post('/items/new', (req, res) => {
  // const user = req.user.id;
  const item = req.body;

  Item.forge({
    created_by: item.created_by,
    status_id: item.status,
    category_id: item.category,
    condition_id: item.condition,
    name: item.name,
    image: item.image,
    description: item.description,
    price: item.price,
    manufacturer: item.manufacturer,
    model: item.model,
    length: item.length,
    width: item.width,
    height: item.height,
    notes: item.notes,
    views: 0
  })
    .save(null, { method: 'insert' })
    .then(newItem => {
      let id = newItem.attributes.id;

      Item.where({ id: id })
        .fetch({
          withRelated: ['createdBy', 'category', 'condition', 'status']
        })
        .then(item => {
          const relations = item.relations;
          item = item.attributes;

          const condition = relations.condition.attributes;
          const category = relations.category.attributes;
          const createdBy = relations.createdBy.attributes;
          const status = relations.status.attributes;


          const itemData = {
            id: item.id,
            created_by: createdBy.username,
            status: status.name,
            category: category.name,
            condition: condition.name,
            name: item.name,
            image: item.image,
            description: item.description,
            price: item.price,
            manufacturer: item.manufacturer,
            model: item.model,
            height: item.height,
            length: item.length,
            width: item.width,
            notes: item.notes,
            views: item.views
          };

          res.json(itemData);
        })
        .catch(err => {
          res.status(500);
          res.json(err);
        });
    });
});

/************************
 * PUT
 ************************/

router.put('/items/:id/edit', (req, res) => {
  const itemData = req.body.attributes;
  const item_id = req.params.id;
  const user_id = req.user.id;

  Item.where({ id: item_id })
    .fetch()
    .then(item => {
      if (!item) {
        res.status(400);
        res.json({ error: "That item doesn't exist" });
      }
      if (item.attributes.created_by !== user_id) {
        res.status(400);
        res.json({ error: "You don't own that item" });
      }

      Item.where({ id: item_id })
        .save(
          {
            status: status.name,
            category: category.name,
            condition: condition.name,
            name: item.name,
            image: item.image,
            description: item.description,
            price: item.price,
            manufacturer: item.manufacturer,
            model: item.model,
            height: itemData.height,
            length: itemData.length,
            width: itemData.width,
            notes: item.notes
          },
          { patch: true }
        )
        .then(updated => {
          res.json(updated);
        })
        .catch(err => {
          res.status(500);
          res.json(err);
        });
    });
});

/************************
 *  DELETE
 ************************/

router.delete('/items/:id', (req, res) => {
  const id = req.params.id;
  const user_id = req.user.id;

  new Item({ id: id })
    .fetch()
    .then(item => {
      if (!item) {
        res.status(400);
        res.json({ error: 'That item does not exist' });
      }

      if (item.attributes.created_by !== user_id) {
        res.status(400);
        res.json({ error: 'That item does not belong to you' });
      }
    })
    .destroy()
    .then(() => {
      Item.fetchAll({
        withRelated: ['createdBy', 'category', 'condition', 'status']
      })
        .then(items => {
          itemList = items.models;
          items = [];

          itemList.forEach(item => {
            item = item.attributes;
            const relations = item.relations;
            const condition = relations.condition.attributes;
            const category = relations.category.attributes;
            const createdBy = relations.createdBy.attributes;
            const status = relations.status.attributes;

            const itemData = {
              id: item.id,
              created_by: createdBy.username,
              status: status.name,
              category: category.name,
              condition: condition.name,
              name: item.name,
              image: item.image,
              description: item.description,
              price: item.price,
              manufacturer: item.manufacturer,
              model: item.model,
              dimensions: item.dimensions,
              created_at: item.created_at,
              updated_at: item.updated_at,
              notes: item.notes,
              views: item.views
            };

            items.push(itemData);
          });
          res.json(items);
        })
        .catch(err => {
          res.status(500);
          res.json(err);
        })
    })
});

module.exports = router;