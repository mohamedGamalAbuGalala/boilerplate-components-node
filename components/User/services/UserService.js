const UserModel = require('../models/UserModel');
const { ErrorsConstants } = require('../../../shared/constants');
const { permittedParams } = require('../../../shared/bodyPicker');

const {
  INTERNAL_SERVER_ERROR,
  // NOT_FOUND_ERROR,
  DUPLICATE_DATA
} = ErrorsConstants;

const privateMethods = {
  async isValidRegister(body) {
    const promises = {
      email: UserModel.getOneQuery({ email: body.email }, true),
      phoneNumber: UserModel.getOneQuery(
        { phoneNumber: body.phoneNumber },
        true
      )
    };
    const { email, phoneNumber } = await Promise.props(promises);
    const error = {};
    if (email) error.email = ['taken'];
    if (phoneNumber) error.phoneNumber = ['taken'];
    return error;
  }
};

class UserService {
  static async register(body) {
    const safeBody = permittedParams(body, [
      'firstName',
      'lastName',
      'countryCode',
      'phoneNumber',
      'gender',
      'birthDate',
      'avatar',
      'email'
    ]);
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
}

module.exports = UserService;
