const UserModel = require('../models/UserModel');
const { ErrorsConstants } = require('../../../shared/constants');
const { permittedParams } = require('../../../shared/bodyPicker');

const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_ERROR,
  DUPLICATE_DATA
} = ErrorsConstants;

class UserService {
  static async getAll(lastId) {
    try {
      const data = await UserModel.getAllPagination(lastId);
      return { data };
    } catch (ex) {
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }

  static async getOne(id) {
    try {
      const data = await UserModel.getOneQuery({ _id: id });
      if (!data) return { error: NOT_FOUND_ERROR };
      return { data };
    } catch (ex) {
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }

  static async addOne(body) {
    const safeBody = permittedParams(body, ['name']);
    try {
      const data = await UserModel.addOne(safeBody);
      return { data: data.toObject() };
    } catch (ex) {
      if (ex.code === 11000) return { error: { ...ex, ...DUPLICATE_DATA } };
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }

  static async updateOne(id, body) {
    const safeBody = permittedParams(body, ['name']);
    try {
      const exist = await UserModel.getOneQuery({ _id: id });
      if (!exist) return { error: NOT_FOUND_ERROR };

      const data = await UserModel.updateOneById(id, safeBody);
      if (!data) return { error: NOT_FOUND_ERROR };
      return { data };
    } catch (ex) {
      if (ex.code === 11000) return { error: { ...ex, ...DUPLICATE_DATA } };
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }

  static async deleteOne(id) {
    try {
      const exist = await UserModel.getOneQuery({ _id: id });
      if (!exist) return { error: NOT_FOUND_ERROR };

      const response = await UserModel.deleteMany([id]);
      if (response.ok !== 1) return { error: INTERNAL_SERVER_ERROR };
      return { data: true };
    } catch (ex) {
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }
}

module.exports = UserService;
