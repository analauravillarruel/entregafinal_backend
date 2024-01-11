const user = require('../Dao/models/userModel');
const userDAO = require('./');

class userDAOMongo extends ContactoDAO {
    async obtenerTodos() {
        return await user.find();
    }
    
    async obtenerPorId(id) {
        return await user.findById(id);
    }

    async agregar(contacto) {
        return await user.create(contacto);
    }

    async actualizar(id, contacto) {
        return await user.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await user.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;