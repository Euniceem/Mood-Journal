const bookshelf = require('./bookshelf');
require('./Entry_Emotion');

class Emotion extends bookshelf.Model {
  get tableName() {
    return 'emotions';
  }

  get hasTimestamps() {
    return true;
  }

  entry_emotions() {
    return this.hasMany('Entry_Emotion');
  }
}

module.exports = bookshelf.model('Emotion', Emotion);
