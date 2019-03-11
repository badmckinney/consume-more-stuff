const bookshelf = require('./bookshelf');
const Item = require('./Item');

class Condition extends bookshelf.Model {
  get tableName() { return 'conditions'; }
  get hasTimestamps() { return true; }
  item() { return this.hasMany('Item', 'items'); }
}

module.exports = bookshelf.model('Condition', Condition);