const jsonwebtoken = require('jsonwebtoken');
const config = require('config');

const jwt = Promise.promisifyAll(jsonwebtoken);

const UserModel = require('../models/UserModel');

module.exports = {
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
  },

  async validatePhoneNumber(phoneNumber) {
    const isExist = await UserModel.getOneQuery({ phoneNumber }, true);
    const error = {};
    if (!isExist) error.phoneNumber = ['not_exist'];
    if (Object.keys(error).length) return { error };
    return { data: isExist };
  },

  generateToken(data) {
    return jwt.sign(
      {
        ...data,
        exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60 * 30 // Note: in seconds!
      },
      config.get('jwtPrivateKey')
    );
  },

  verifyToken(token) {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    return decoded;
  }
};
