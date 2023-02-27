let users = require('../mocks/users');

module.exports = {

  ListUser(req, res) {

    const {order} = req.query;

    const listSort = users.sort((a, b) => {
      if(order === 'desc') {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    })

    res.send(200, listSort)
  },

  ListUserId(req, res) {
    const {id} = req.params;

    const user = users.find((use) => use.id === Number(id));

    if(!user) {
      return res.send(400, {error: 'User not found!'})
    }

    res.send(200, user)
  },

  CreateUser(req, res) {
    const {body} = req;

    const lastUser = users[users.length - 1].id;
    const newUser = {
      id: lastUser + 1,
      name: body.name,
    };
  
    users.push(newUser);
  
    res.send(200, newUser);
  },

  UpdateUser(req, res) {
    let { id } = req.params;
    const { name } = req.body;

    id = Number(id);

    const userExists = users.find((user) => user.id === id);

    if(!userExists) {
      return res.send(400, {error: 'User not exists'});
    }

    users = users.map((user) => {
      if(user.id === id) {
        return {
          ...user,
          name,
        };
      }

      return user;

    });

    res.send(200, {id, name})



  }



}