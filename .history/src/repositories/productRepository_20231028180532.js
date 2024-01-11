const productModel = require('../Dao/models/productsModels');
const DAOFactory = require('../utils/DaoFactory');

class ProductRepository {
    constructor() {
        this.productManager = DAOFactory.getManager('product');
    }

    async getAllProducts() {
        try {
            const products = await this.productManager.getProducts();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.productManager.getProductById(productId);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async addProduct(productData) {
        try {
            const newProduct = await productModel.create(productData);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(productId, updatedData) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(productId);
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductRepository;