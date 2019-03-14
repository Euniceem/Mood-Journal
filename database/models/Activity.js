const bookshelf = require('./bookshelf');
require('./Entry_Activity');

class Activity extends bookshelf.Model {
  get tableName() {
    return 'activities';
  }

  get hasTimestamps() {
    return true;
  }

  entry_activities() {
    return this.hasMany('Entry_Activity');
  }
}

module.exports = bookshelf.model('Activity', Activity);
