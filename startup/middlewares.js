const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

// middlewares
const loggerMiddleware = require('../middlewares/loggerMiddleware');

module.exports = app => {
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser()); // ?
  app.use(cors());

  app.use(loggerMiddleware);
  // each request should includes specific params to pass!
  // app.use(secureCalls.tokenValidation);
  // limit how many call per/second for each endpoint
  // app.use(secureCalls.limitCalls);
};
