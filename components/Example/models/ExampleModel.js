const DbModel = require('../ExampleScheme');
const { DefaultConstants } = require('../../../shared/constants');

class ExampleModel {
  static getAllPagination(lastId) {
    let query = {};
    if (lastId) query = { _id: { $gt: lastId } };
    return DbModel.find({ ...query, isArchived: false })
      .select('-isArchived -updatedAt -createdAt -__v')
      .limit(DefaultConstants.Pagination.LIMIT)
      .lean();
  }

  static getOneQuery(query) {
    return DbModel.findOne({
      ...query,
      isArchived: false
    })
      .select('-isArchived -updatedAt -createdAt -__v')
      .lean();
  }

  static addOne(body) {
    const dbInstance = new DbModel(body);
    return dbInstance.save();
  }

  static updateOneById(id, body) {
    return DbModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    })
      .select('-isArchived -updatedAt -createdAt -__v')
      .lean();
  }

  static deleteMany(ids) {
    const queries = ids.map(id => ({
      updateOne: {
        filter: { _id: id, isArchived: false },
        update: { isArchived: true }
      }
    }));
    return DbModel.bulkWrite(queries);
  }
}

module.exports = ExampleModel;
