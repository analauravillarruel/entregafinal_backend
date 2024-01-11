const user = require('../Dao/models/userModel');
const ContactouserDAO = require('./');

class ContactouserDAOMongo extends ContactoDAO {
    async obtenerTodos() {
        return await Contactouser.find();
    }
    
    async obtenerPorId(id) {
        return await Contactouser.findById(id);
    }

    async agregar(contacto) {
        return await Contactouser.create(contacto);
    }

    async actualizar(id, contacto) {
        return await Contactouser.findByIdAndUpdate(id, contacto, { new: true });
    }

    async borrar(id) {
        return await Contactouser.findByIdAndDelete(id);
    }
}

module.exports = ContactoDAOMongo;