const userModel = require('../Dao/models/userModel');
const userController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await User.find();
    }
    
    async obtenerPorId(user) {
        return await User.findById(id);
    }

    async agregar(user) {
        return await User.create(contacto);
    }

    async actualizar(id, contacto) {
        return await User.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = UserDaoMongo;