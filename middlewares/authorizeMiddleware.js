/* eslint-disable no-param-reassign */
const accessibleRoutes = require('../shared/accessibleRoutes');
const logging = require('../startup/logging');

const replaceParams = (url, params) => {
  const indexOfQuery = url.indexOf('?');

  if (indexOfQuery !== -1) {
    url = url.slice(0, indexOfQuery);
  }

  if (url[url.length - 1] === '/') {
    url = url.slice(0, -1);
  }

  if (!Object.keys(params).length) {
    return url;
  }

  const parts = url.split('/').map(urlPart => {
    const reqParam = Object.keys(params).find(key => params[key] === urlPart);
    return reqParam ? `:${reqParam}` : urlPart;
  });

  return parts.join('/');
};

const matchPermission = (permissions, userPermissions) =>
  permissions.some(perm => userPermissions.includes(perm));
module.exports = (req, res, next) => {
  const { originalUrl } = req;
  const { method } = req;
  const reqParams = req.params ? req.params : {};
  const reshapedUrl = replaceParams(originalUrl, reqParams);
  const currentUrl = accessibleRoutes.find(
    routeObj => routeObj.url === reshapedUrl && routeObj.method === method
  );
  if (!currentUrl) {
    logging.logger.warn(`In accessible route. ${originalUrl}`);
    return res.status(404).send('404 Not Found');
  }

  if (!matchPermission(currentUrl.permissions, req.decoded.permissions)) {
    logging.logger.error(`access denied! ${originalUrl}`);
    return res.status(403).send('unAuthorized to access this api ');
  }

  return next();
};
