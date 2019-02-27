const bookshelf = require('./bookshelf');
const Item = require('./Item');

class ItemStatus extends bookshelf.Model {
  get tableName() { return 'item_statuses'; }
  get hasTimestamps() { return true; }
  item() { return this.hasMany('Item', 'items'); }
}

module.exports = bookshelf.model('ItemStatus', ItemStatus);