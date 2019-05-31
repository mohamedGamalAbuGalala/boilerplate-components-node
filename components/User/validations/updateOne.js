const { ValidatorHelper, Builder } = require('validation-helpers');

module.exports = ({ body, params }) => {
  const error = {};

  const scheme = {
    paramsId: {
      value: params.id,
      rules: new Builder()
        .required()
        .isMongoObjectId('id must be a valid ObjectId').value
    },
    name: {
      value: body.name,
      rules: new Builder()
        .required('name is required')
        .minLength(2, 'name must be at least 2 characters')
        .maxLength(200, 'name must be at max 200 characters').value
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
