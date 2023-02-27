const userController = require('./src/Controllers/UserController');


module.exports = [
  {
    endpoint: '/users',
    method: 'GET',  
    handler: userController.ListUser
  },
  {
    endpoint: '/users/:id',
    method: 'GET',  
    handler: userController.ListUserId
  },
  {
    endpoint: '/users',
    method: 'POST',  
    handler: userController.CreateUser
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',  
    handler: userController.UpdateUser
  },
]