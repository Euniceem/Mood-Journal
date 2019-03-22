const bookshelf = require('./bookshelf');
require('./Entry_Emotion');
require('./Custom_Emotion');
require('./User');

class User_Setting extends bookshelf.Model {
  get tableName() { return 'user_settings' }

  default_emotion() {
    return this.hasMany('Default_Emotion');
  }

  custom_emotion() {
    return this.hasMany('Custom_Emotion');
  }

  user() {
    return this.belongsTo('User');
  }
}

module.exports = bookshelf.model('User_Setting', User_Setting);
