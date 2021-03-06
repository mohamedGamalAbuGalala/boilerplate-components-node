const { ValidatorHelper, Builder } = require('validation-helpers');
const Moment = require('moment');
const countryCodes = require('../constants/countryCodes');
const { UserConstants } = require('../../../shared/constants');

module.exports = ({ body, file }) => {
  const error = {};

  const scheme = {
    firstName: {
      value: body.firstName,
      rules: new Builder()
        .required('blank')
        .minLength(2, 'too_short')
        .maxLength(200, 'too_long').value
    },
    lastName: {
      value: body.lastName,
      rules: new Builder()
        .required('blank')
        .minLength(2, 'too_short')
        .maxLength(200, 'too_long').value
    },
    countryCode: {
      value: body.countryCode,
      rules: new Builder()
        .required('blank')
        .isMember(countryCodes.codes, 'inclusion').value
    },
    phoneNumber: {
      value: body.phoneNumber,
      rules: new Builder()
        .required('blank')
        .isNumber('not_a_number')
        .minLength(10, 'too_short')
        .maxLength(15, 'too_long')
        .isMobile('invalid').value
    },
    gender: {
      value: body.gender,
      rules: new Builder()
        .required('blank')
        .isMember(Object.values(UserConstants.GENDER), 'inclusion').value
    },
    birthDate: {
      value: body.birthDate,
      rules: new Builder()
        .required('blank')
        .isDate('YYYY-MM-DD', 'invalid - YYYY-MM-DD').value
    },
    avatar: {
      value: file ? file.path : '',
      rules: new Builder().required('blank').value
    },
    email: {
      value: body.email,
      rules: new Builder().isEmail('invalid').value
    },
    password: {
      value: body.password,
      rules: new Builder()
        .required('blank')
        .minLength(4, 'too_short')
        .maxLength(50, 'too_long').value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  // TODO: add this to our validation-helper => solve issue #7
  if (!error.birthDate && Moment(body.birthDate).isAfter(new Moment()))
    error.birthDate = ['in_the_future'];

  // eslint-disable-next-line no-undef
  return { error: _.isEmpty(error) ? undefined : error };
};
