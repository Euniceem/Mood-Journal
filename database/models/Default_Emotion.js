const bookshelf = require('./bookshelf');
require('./Entry_Emotion');

class Default_Emotion extends bookshelf.Model {
  get tableName() {
    return 'default_emotions';
  }

  get hasTimestamps() {
    return true;
  }

  entry_emotions() {
    return this.hasMany('Entry_Emotion');
  }
}

module.exports = bookshelf.model('Default_Emotion', Default_Emotion);
