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
        const index = this.users.findIndex(user => user.id === id);
        this.users[index] = { ...userActualizado, id };
        return this.users[index];
    }

    async borrar(id) {
        const index = this.users.findIndex(user => user.id === id);
        this.users.splice(index, 1);
    }
}

module.exports = ContactoDAOEnMemoria;