const bookshelf = require('./bookshelf');
const Item = require('./Item');

class Category extends bookshelf.Model {
  get tableName() { return 'categories'; }
  get hasTimestamps() { return true; }
  items() { return this.hasMany('Item', 'items'); }
}

module.exports = bookshelf.model('Category', Category);