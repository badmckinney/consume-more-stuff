const bookshelf = require('./bookshelf');
const Item = require('./Item');
const UserStatus = require('./UserStatus.js');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get hasTimestamps() { return true; }
  items() { return this.hasMany('Item', 'items'); }
  status() { return this.hasOne('UserStatus', 'id', 'status_id'); }
}

module.exports = bookshelf.model('User', User);