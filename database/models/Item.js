const bookshelf = require('./bookshelf');
const User = require('./User');
const ItemStatus = require('./ItemStatus');
const Category = require('./Category');
const Condition = require('./Condition');

class Item extends bookshelf.Model {
  get tableName() { return 'items'; }
  get hasTimestamps() { return true; }
  createdBy() { return this.hasOne('User', 'id', 'created_by'); }
  status() { return this.hasOne('ItemStatus', 'id', 'status_id'); }
  condition() { return this.hasOne('Condition', 'id', 'condition_id'); }
  category() { return this.hasOne('Category', 'category_id'); }
}

module.exports = bookshelf.model('Item', Item);