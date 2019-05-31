const Example = require('../components/Example');
const User = require('../components/User');
const ErrorHandler = require('../middlewares/errorHandlerMiddleware');

module.exports = app => {
  app.use('/api/example', Example.Router);
  app.use('/api/user', User.Router);

  app.use(ErrorHandler.catch404Errors);
  app.use(ErrorHandler.handleUnexpectedErrors);
};
