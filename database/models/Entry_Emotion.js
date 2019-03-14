const bookshelf = require('./bookshelf');
require('./Entry');
require('./Default_Emotion');
require('./Custom_Emotion');

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

  default_emotion() {
    return this.belongsTo('Default_Emotion');
  }

  custom_emotion() {
    return this.belongsTo('Custom_Emotion');
  }
}

module.exports = bookshelf.model('Entry_Emotion', Entry_Emotion);
