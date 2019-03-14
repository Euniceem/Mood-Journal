const bookshelf = require('./bookshelf');
require('./User');
require('./Entry_Emotion');

class Custom_Emotion extends bookshelf.Model {
  get tableName() {
    return 'custom_emotions';
  }

  get hasTimestamps() {
    return true;
  }

  get hidden() {
    return ['id', 'created_at', 'updated_at'];
  }

  user() {
    return this.belongsTo('User');
  }

  entry_emotions() {
    return this.hasMany('Entry_Emotion');
  }
}

module.exports = bookshelf.model('Custom_Emotion', Custom_Emotion);
