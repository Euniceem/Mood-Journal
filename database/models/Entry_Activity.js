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

  get hidden() {
    return ['id', 'entry_id', 'created_at', 'updated_at'];
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
