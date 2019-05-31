/* eslint-disable no-undef */
const permittedParams = (params, acceptedKeys) => {
  if (!_.isEmpty(params)) {
    const mappedParams = _.mapKeys(params, mapAttrs);
    return _.pick(mappedParams, acceptedKeys);
  }
  return {};
};

const mapAttrs = (value, key) => {
  const paramsMap = {};
  return paramsMap[key] || key;
};

module.exports = {
  permittedParams
};
