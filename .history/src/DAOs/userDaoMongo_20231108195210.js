const Contacto = require('../Dao/models/userModel');
const ContactoDAO = require('./');

class ContactoDAOMongo extends ContactoDAO {
    async obtenerTodos() {
        return await Contacto.find();
    }
    
    async obtenerPorId(id) {
        return await Contacto.findById(id);
    }

    async agregar(contacto) {
        return await Contacto.create(contacto);
    }

    async actualizar(id, contacto) {
        return await Contacto.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await Contacto.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;