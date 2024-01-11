const mongoose = require('mongoose');
const user = require('../Dao/models/userModel')


class UserDao {

  constructor() {

    this.model = userModel

  }

  
  app.get('/users', async(req, res) => {

    const users = await UserDao.getAll();

    res.json(users);
  });



  app.get('/users/:id', async (req, res) => {

    const user = await UserDao.get(req.params.id);

    if (user) {

      res.json(user);

    } else {

      res.status(404).send('User not found');

    }

  });



  app.post('/users', async (req, res) => {

    const newUser = await UserDao.create(req.body);

    res.json(newUser);

  });



  app.put('/users/:id', async (req, res) => {

    const updatedUser = await UserDao.update(req.params.id, req.body);

    if (updatedUser) {

      res.json(updatedUser);

    } else {

      res.status(404).send('User not found');

    }

  });



  app.delete('/users/:id', async (req, res) => {

    await UserDao.delete(req.params.id);

    res.status(200).send('User deleted');

  });
  
}


module.exports = UserDao;