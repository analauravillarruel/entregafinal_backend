const userModel = require('../Dao/models/userModel');
const userController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await userModel.find();
    }
    
    async obtenerPorId(id) {
        return await userModel.findById(id);
    }

    async agregar(contacto) {
        return await userModel.create(contacto);
    }

    async actualizar(id, contacto) {
        return await userModel.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await userModel.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;