const UserModel = require('../models/UserModel');
const { ErrorsConstants } = require('../../../shared/constants');
const privateMethods = require('./userService.private');

const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND_ERROR,
  DUPLICATE_DATA
} = ErrorsConstants;

class UserService {
  static async register(safeBody) {
    try {
      const isUnique = await privateMethods.isValidRegister(safeBody);
      if (Object.keys(isUnique).length)
        return { error: { ...DUPLICATE_DATA, ...isUnique } };
      const data = await UserModel.addOne(safeBody);
      return { data: data.toObject() };
    } catch (ex) {
      if (ex.code === 11000) return { error: { ...ex, ...DUPLICATE_DATA } };
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }

  static async login(safeBody) {
    try {
      const {
        data: user,
        error: notValidPhoneError
      } = await privateMethods.validatePhoneNumber(safeBody.phoneNumber);
      if (notValidPhoneError)
        return { error: { ...NOT_FOUND_ERROR, ...notValidPhoneError } };

      // validate current user password
      const validPassword = UserModel.validatePassword(
        safeBody.password,
        user.password
      );
      if (!validPassword)
        return { error: { ...BAD_REQUEST, password: ['incorrect_password'] } };
      return {
        data: privateMethods.generateToken({
          phoneNumber: safeBody.phoneNumber
        })
      };
    } catch (ex) {
      if (ex.code === 11000) return { error: { ...ex, ...DUPLICATE_DATA } };
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }
}

module.exports = UserService;
