const bookshelf = require('./bookshelf');
require('./Entry');
require('./Emotion');

class Entry_Emotion extends bookshelf.Model {
  get tableName() {
    return 'entry_emotions';
  }

  get hasTimestamps() {
    return true;
  }

  entry() {
    return this.belongsTo('Entry');
  }

  emotion() {
    return this.belongsTo('Emotion');
  }
}

module.exports = bookshelf.model('Entry_Emotion', Entry_Emotion);
