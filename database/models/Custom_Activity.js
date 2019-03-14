const bookshelf = require('./bookshelf');
require('./User');
require('./Entry_Activity');

class Custom_Activity extends bookshelf.Model {
  get tableName() {
    return 'custom_activities';
  }

  get hasTimestamps() {
    return true;
  }

  user() {
    return this.belongsTo('User');
  }

  entry_activities() {
    return this.hasMany('Entry_Activity');
  }
}

module.exports = bookshelf.model('Custom_Activity', Custom_Activity);
