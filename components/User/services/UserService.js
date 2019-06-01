const UserModel = require('../models/UserModel');
const { ErrorsConstants } = require('../../../shared/constants');

const { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND_ERROR } = ErrorsConstants;

class UserService {
  static async updateStatus(safeBody, decoded) {
    try {
      if (safeBody.phoneNumber !== decoded.phoneNumber)
        return {
          error: {
            ...BAD_REQUEST,
            token: ['incorrect_token/phone_combination']
          }
        };

      const data = await UserModel.updateOneQuery(
        { phoneNumber: safeBody.phoneNumber },
        {
          status: safeBody.status
        }
      );
      if (!data)
        return {
          error: { ...NOT_FOUND_ERROR, ...{ phoneNumber: ['not_exist'] } }
        };

      return { data };
    } catch (ex) {
      return {
        error: { ...ex, ...INTERNAL_SERVER_ERROR }
      };
    }
  }
}

module.exports = UserService;
