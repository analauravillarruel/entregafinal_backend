const User = require('../Dao/models/userModel');
const User = require('../controllers/usersController');

class UserDaoMongo extends UserDao{
    async obtenerTodos() {
        let users = await userModel.find();
        return users;
    }
    
    async obtenerPorId(user) {
        return await User.findById(id);
    }

    async agregar(user) {
        return await User.create(user);
    }

    async actualizar(id, user) {
        return await User.findByIdAndUpdate(id, user, { new: true });
    }

    async borrar(id) {
        return await User.findByIdAndDelete(id);
    }
}

module.exports = UserDaoMongo;