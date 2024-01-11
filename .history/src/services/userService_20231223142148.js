// services/userService.js
// services/userService.js
const UserDao = require('../DAOs/userDao');
const { createHash, isValidPassword } = require('../utils/passwordHash');
const { generateToken } = require('../utils/jwt');

class UserService {
  constructor() {
    console.log("UserService initialized");

    this.userDao = new UserDao();
  }

  async registerUser(userData) {
    console.log('Calling registerUser with data:', userData);
  
    console.log('this.UserModel is a function:', typeof this.UserModel === 'function');
    const existingUser = await this.UserModel.getUserByEmail(userData.email);
  
    console.log('Existing User:', existingUser);
  
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
  
    const hashedPassword = createHash(userData.password);
    const newUser = {
      ...userData,
      password: hashedPassword,
      username: userData.email,
      isAdmin: userData.isAdmin || false,
    };
  

    await this.UserModel.save(newUser);
  }
  
  

  async loginUser(email, password) {
    const user = await this.userDao.getUserById(email);

    if (!user || !isValidPassword(password, user.password)) {
      throw new Error('Credenciales incorrectas');
    }

    return {
      user: {
        name: user.name,
        email: user.email,
        // Otros campos según sea necesario
      },
      token: generateToken({
        name: user.name,
        email: user.email,
      }),
    };
  }

  async getAllUsers() {
    return this.userDao.getUsers();
  }

  async getUserById(userId) {
    return this.userDao.getUserById(userId);
  }

  async updateUser(userId, userData) {
    return this.userDao.updateUser(userId, userData);
  }

  async deleteUser(userId) {
    return this.userDao.deleteUser(userId);
  }
  async getUserByEmail(email) {
    const user = await this.userDao.getUserByEmail(email);
    return user;
  }
  
  
  

}


module.exports = UserService;