const bookshelf = require('./bookshelf');
require('./Entry');

class Mood extends bookshelf.Model {
  get tableName() {
    return 'moods';
  }

  get hasTimestamps() {
    return true;
  }

  get hidden() {
    return ['id', 'created_at', 'updated_at'];
  }

  entries() {
    return this.hasMany('Entry');
  }
}

module.exports = bookshelf.model('Mood', Mood);
