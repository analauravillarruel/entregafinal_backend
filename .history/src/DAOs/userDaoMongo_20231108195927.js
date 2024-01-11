const userModel = require('../Dao/models/userModel');
const userController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await User.find();
    }
    
    async obtenerPorId(id) {
        return await .findById(id);
    }

    async agregar(contacto) {
        return await .create(contacto);
    }

    async actualizar(id, contacto) {
        return await .findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await .findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;