const bookshelf = require('./bookshelf');
require('./Entry');

class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }

  get hasTimestamps() {
    return true;
  }

  get hidden() {
    return ['id', 'password'];
  }

  entries() {
    return this.hasMany('Entry');
  }
}

module.exports = bookshelf.model('User', User);
