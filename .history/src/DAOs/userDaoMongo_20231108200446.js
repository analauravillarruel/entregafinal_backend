const UserModel = require('../Dao/models/userModel');
const UserController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await User.find();
    }
    
    async obtenerPorId(user) {
        return await User.findById(id);
    }

    async agregar(user) {
        return await User.create(user);
    }

    async actualizar(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    async borrar(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = UserDaoMongo;