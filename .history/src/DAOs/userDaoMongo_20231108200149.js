const userModel = require('../Dao/models/userModel');
const userController = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        return await USER.find();
    }
    
    async obtenerPorId(User) {
        return await USER.findById(id);
    }

    async agregar(user) {
        return await USER.create(contacto);
    }

    async actualizar(id, contacto) {
        return await u.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await u.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;