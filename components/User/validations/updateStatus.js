const { ValidatorHelper, Builder } = require('validation-helpers');

module.exports = ({ body, query, headers }) => {
  const error = {};

  const scheme = {
    phoneNumber: {
      value: body.phoneNumber,
      rules: new Builder()
        .required('blank')
        .isNumber('not_a_number')
        .minLength(10, 'too_short')
        .maxLength(15, 'too_long')
        .isMobile('invalid').value
    },
    token: {
      value: body.auth_token || query.auth_token || headers.auth_token,
      rules: new Builder().required('blank').minLength(4, 'too_short').value
    },
    status: {
      value: body.status,
      rules: new Builder().required('blank').value
    }
  };

  Object.keys(scheme).forEach(key => {
    const ele = scheme[key];
    const { errors, isValid } = ValidatorHelper(ele.value, ele.rules);
    if (!isValid) error[key] = errors;
  });

  // eslint-disable-next-line no-undef
  return { error: _.isEmpty(error) ? undefined : error };
};
