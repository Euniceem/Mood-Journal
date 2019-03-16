const bookshelf = require('./bookshelf');
require('./Entry');
require('./Custom_Activity');
require('./Custom_Emotion');

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

  custom_activities() {
    return this.hasMany('Custom_Activity');
  }

  custom_emotions() {
    return this.hasMany('Custom_Emotion');
  }
}

module.exports = bookshelf.model('User', User);
