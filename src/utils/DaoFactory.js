const UserManager = require('../Dao/UserManagerMongo');
const ProductManager = require('../Dao/productManagerMongo');
const CartManager = require('../Dao/cartsManagerMongo');
const MessageManager = require('../Dao/messagesManagerMongo');

class DAOFactory {
    static getManager(entity) {
        switch(entity) {
            case 'user':
                return new UserManager();
            case 'product':
                return new ProductManager();
            case 'cart':
                return new CartManager();
            case 'message':
                return new MessageManager();
            default:
                throw new Error('Entidad no válida');
        }
    }
}

module.exports = DAOFactory;