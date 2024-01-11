const ProductManagerMongo = require('../Dao/productManagerMongo');
const productSorage =require('../storage/productStorage')

class ProductService {
    constructor() {
        this.manager = new ProductManagerMongo();
    }

    async getProducts() {
        try {
            return await this.manager.getProducts();
        } catch (error) {
            throw error;
        }
    }

    async getProductById(pid) {
        try {
            return await this.manager.getProductById(pid);
        } catch (error) {
            throw error;
        }
    }

    async addProduct(name, price) {
        try {
            return await this.manager.addProduct(name, price);
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(pid, name, price) {
        try {
            await this.manager.updateProduct(pid, name, price);
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(pid) {
        try {
            await this.manager.deleteProduct(pid);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductService;