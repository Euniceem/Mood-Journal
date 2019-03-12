const bookshelf = require('./bookshelf');
require('./Entry');
require('./Activity');

class Entry_Activity extends bookshelf.Model {
  get tableName() {
    return 'entry_activities';
  }

  get hasTimestamps() {
    return true;
  }

  entry() {
    return this.belongsTo('Entry');
  }

  activity() {
    return this.belongsTo('Activity');
  }
}

module.exports = bookshelf.model('Entry_Activity', Entry_Activity);
