const useController = require('./src/Controllers/UseController');

module.exports = [

  {
    endpoint: '/users',
    method: 'GET',
    handler: useController.ListUsers,
  },
  {
    endpoint: '/products/:id',
    method: 'GET',
    handler: useController.GetListId
  }

]