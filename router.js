const useController = require('./src/Controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: useController.ListUsers
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: useController.ListProducts
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: useController.CreateUser
  }
]
