const UserManager = require('../Dao');

class UsersService {
  constructor () {
    this.userManager = new UserManager();
  }

  async getAll () {
    try {
      const users = await this.userManager.getAll();
      return users;
    } catch (error) {
      throw error;
    }
    

    
  }
  async get (id) {
    try {
      const user = await this.userManager.get(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create (body) {
    try {
      await this.userManager.create(body);
    } catch (error) {
      throw error;
    }
  }

  async update (id, body) {
    try {
      await this.userManager.update(id, body);
    } catch (error) {
      throw error;
    }
  }

  async delete (id) {
    try {
      await this.userManager.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async login (email, password) {
    try {
      const user = await this.userManager.authenticateUser(email, password);

      const token = generateToken({
        userId: user._id, // Usar el campo _id de MongoDB como identificador
        role: user.isAdmin ? 'admin' : 'user' // Asignar roles según si es admin o no
      });

      delete user.password;

      user.token = token;

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;