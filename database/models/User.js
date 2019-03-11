const bookshelf = require('./bookshelf');
const Item = require('./Item');
const UserStatus = require('./UserStatus');
const Role = require('./Role');

class User extends bookshelf.Model {
  get tableName() { return 'users'; }
  get hasTimestamps() { return true; }
  get hidden() { return ['id', 'password']; }
  items() { return this.hasMany('Item', 'items'); }
  status() { return this.hasOne('UserStatus', 'id', 'status_id'); }
  role() { return this.hasOne('Role', 'id', 'role_id'); }
}

module.exports = bookshelf.model('User', User);