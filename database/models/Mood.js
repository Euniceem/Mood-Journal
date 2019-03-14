const bookshelf = require('./bookshelf');
require('./Entry');

class Mood extends bookshelf.Model {
  get tableName() {
    return 'moods';
  }

  get hasTimestamps() {
    return true;
  }

  entries() {
    return this.hasMany('Entry');
  }
}

module.exports = bookshelf.model('Mood', Mood);
