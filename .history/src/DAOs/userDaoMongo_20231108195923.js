const userModel = require('../Dao/models/userModel');
const userController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await User.find();
    }
    
    async obtenerPorId(id) {
        return await U.findById(id);
    }

    async agregar(contacto) {
        return await U.create(contacto);
    }

    async actualizar(id, contacto) {
        return await U.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await U.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;