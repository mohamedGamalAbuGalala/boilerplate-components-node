const express = require('express');

const app = express();

require('dotenv').config();
global.Promise = require('bluebird');
global._ = require('lodash');
global.upload = require('./shared/upload');
global.uploadImages = require('./shared/uploadImages');

require('./startup/db').connect();
require('./startup/logging').handleErrors();
require('./startup/middlewares')(app);
require('./startup/routes')(app);
require('./startup/init')(app);

module.exports = app;
