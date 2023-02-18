const users = require('../mocks/users');

module.exports = {
  ListUsers(req, res) {
   const { order } = req.query;

   const objUser = users.sort((a, b) => {
    if (order === 'desc') {
      return a.id < b.id ?1 : -1;
    }

    return a.id > b.id ? 1 : -1;
   });

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(objUser))
  },

  getUserById(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({ok: true}))
  }
};