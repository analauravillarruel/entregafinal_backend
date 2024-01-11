const userModel = require('../Dao/models/userModel');
const userController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await User.find();
    }
    
    async obtenerPorId(User) {
        return await user.findById(id);
    }

    async agregar(user) {
        return await User.create(contacto);
    }

    async actualizar(id, contacto) {
        return await user.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await user.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;