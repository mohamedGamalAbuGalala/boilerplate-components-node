const { PermissionConstants } = require('./constants');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

module.exports = [
  {
    url: '/api/example',
    method: GET,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/example',
    method: POST,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/example',
    method: PUT,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/example',
    method: DELETE,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/user',
    method: GET,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/user',
    method: POST,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/user',
    method: PUT,
    permissions: [PermissionConstants.ADMIN]
  },
  {
    url: '/api/user',
    method: DELETE,
    permissions: [PermissionConstants.ADMIN]
  }
];
