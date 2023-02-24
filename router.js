const UseController = require('./src/Cotrollers/UseController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: UseController.listUser
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: UseController.listQuery
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: UseController.CreatePost
  }
];