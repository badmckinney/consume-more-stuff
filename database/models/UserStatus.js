const bookshelf = require('./bookshelf');
const User = require('./User');

class UserStatus extends bookshelf.Model {
  get tableName() { return 'user_statuses'; }
  get hasTimestamps() { return true; }
  user() { return this.hasMany('User', 'users'); }
}

module.exports = bookshelf.model('UserStatus', UserStatus);