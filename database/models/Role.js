const bookshelf = require('./bookshelf');
const User = require('./User');

class Role extends bookshelf.Model {
  get tableName() { return 'roles'; }
  get hasTimestamps() { return true; }
  users() { return this.hasMany('User', 'users'); }
}

module.exports = bookshelf.model('Role', Role);