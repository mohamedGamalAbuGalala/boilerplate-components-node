const bcrypt = require('bcryptjs');

const DbModel = require('../UserScheme');

class UserModel {
  static getOneQuery(query, skipArchived = false) {
    const newQuery = query;
    if (!skipArchived) newQuery.isArchived = false;
    return DbModel.findOne(newQuery)
      .select('-isArchived -updatedAt -createdAt -__v')
      .lean();
  }

  static addOne(body) {
    const dbInstance = new DbModel(body);
    return dbInstance.save();
  }

  static validatePassword(candidatePassword, currentPassword) {
    return bcrypt.compareSync(candidatePassword, currentPassword);
  }

  static updateOneQuery(query, body) {
    return DbModel.findOneAndUpdate(query, body, {
      new: true,
      runValidators: true
    })
      .select('-isArchived -updatedAt -createdAt -__v')
      .lean();
  }
}

module.exports = UserModel;
