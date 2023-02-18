const useController = require('./src/Controllers/UseController');


module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: useController.ListUsers,
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: useController.getUserById,
  }
]