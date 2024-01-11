const a = require('../Dao/models/userModel');
const ContactoaDAO = require('./');

class ContactoaDAOMongo extends ContactoDAO {
    async obtenerTodos() {
        return await Contactoa.find();
    }
    
    async obtenerPorId(id) {
        return await Contactoa.findById(id);
    }

    async agregar(contacto) {
        return await Contactoa.create(contacto);
    }

    async actualizar(id, contacto) {
        return await Contactoa.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await Contactoa.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;