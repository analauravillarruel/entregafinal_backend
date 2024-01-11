const CartManagerMongo = require('../Dao/cartsManagerMongo');
const CartStorage = require('../storage/cartStorage')

class CartService {
    constructor() {
        this.manager = new CartManagerMongo();
    }

    async getCarts() {
        try {
            return await this.manager.getCarts();
        } catch (error) {
            throw error;
        }
    }

    async getCartById(cid) {
        try {
            return await this.manager.getCartById(cid);
        } catch (error) {
            throw error;
        }
    }

    async addCart() {
        try {
            return await this.manager.addCart();
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cid, pid) {
        try {
            await this.manager.addProductToCart(cid, pid);
        } catch (error) {
            throw error;
        }
    }

    async removeProductFromCart(cid, pid) {
        try {
            await this.manager.removeProductFromCart(cid, pid);
        } catch (error) {
            throw error;
        }
    }

    async updateCartProducts(cid, products) {
        try {
            await this.manager.updateCartProducts(cid, products);
        } catch (error) {
            throw error;
        }
    }

    async updateProductQuantity(cid, pid, quantity) {
        try {
            await this.manager.updateProductQuantity(cid, pid, quantity);
        } catch (error) {
            throw error;
        }
    }

    async clearCart(cid) {
        try {
            await this.manager.clearCart(cid);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CartService;