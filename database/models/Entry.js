const bookshelf = require('./bookshelf');
require('./User');
require('./Mood');
require('./Entry_Emotion');
require('./Entry_Activity');

class Entry extends bookshelf.Model {
  get tableName() {
    return 'entries';
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User');
  }

  mood() {
    return this.belongsTo('Mood');
  }

  entryEmotions() {
    return this.hasMany('Entry_Emotion');
  }

  entryActivities() {
    return this.hasMany('Entry_Activity');
  }
}

module.exports = bookshelf.model('Entry', Entry);
