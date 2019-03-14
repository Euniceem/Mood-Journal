const bookshelf = require('./bookshelf');
require('./Entry');
require('./Default_Activity');
require('./Custom_Activity');

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

  default_activity() {
    return this.belongsTo('Default_Activity');
  }

  custom_activity() {
    return this.belongsTo('Custom_Activity');
  }
}

module.exports = bookshelf.model('Entry_Activity', Entry_Activity);
