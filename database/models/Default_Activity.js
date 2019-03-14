const bookshelf = require('./bookshelf');
require('./Entry_Activity');

class Default_Activity extends bookshelf.Model {
  get tableName() {
    return 'default_activities';
  }

  get hasTimestamps() {
    return true;
  }

  get hidden() {
    return ['created_at', 'updated_at'];
  }

  entry_activities() {
    return this.hasMany('Entry_Activity');
  }
}

module.exports = bookshelf.model('Default_Activity', Default_Activity);
