const { Builder, ValidatorHelper } = require('validation-helpers');

module.exports = ({ params }) => {
  const error = {};

  const scheme = {
    paramsId: {
      value: params.id,
      rules: new Builder()
        .required()
        .isMongoObjectId('id must be a valid ObjectId').value
    }
  };

  Object.keys(scheme).forEach(key => {
    const element = scheme[key];
    const { errors, isValid } = ValidatorHelper(element.value, element.rules);
    if (!isValid) error[key] = errors;
  });

  // eslint-disable-next-line no-undef
  return { error: _.isEmpty(error) ? undefined : error };
};
