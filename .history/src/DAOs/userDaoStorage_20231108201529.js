const UserDao = require('./userDao');

class userDaoStorage extends UserDao {
    constructor() {
        super();
        this.users = [];
        this.idActual = 1;
    }

    async obtenerTodos() {
        return [...this.users];
    }

    async obtenerPorId(id) {
        return this.user.find(contacto => contacto.id === id) || null;
    }

    async agregar(user) {
        user.id = this.idActual++;
        this.users.push(user);
        return contacto;
    }

    async actualizar(id, userActualizado) {
        const index = this.users.findIndex(c => contacto.id === id);
        this.users[index] = { ...contactoActualizado, id };
        return this.contactos[index];
    }

    async borrar(id) {
        const index = this.users.findIndex(contacto => contacto.id === id);
        this.contactos.splice(index, 1);
    }
}

module.exports = ContactoDAOEnMemoria;