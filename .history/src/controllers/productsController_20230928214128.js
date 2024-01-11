const ProductManagerMongo = require('../Dao/productManagerMongo');

const productManager = new ProductManagerMongo();

const getProducts = async (req, res) => {
    try {
        const products = await productManager.getProducts();
        return res.status(200).json({ status: 'success', payload: products });
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los productos', message: error.message });
    }
}

const getProductById = async (req, res) => {
    const pid = req.params.pid;
    try {
        const product = await productManager.getProductById(pid);
        return res.status(200).json({ status: 'success', payload: product });
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener el producto', message: error.message });
    }
}

const addProduct = async (req, res) => {
    const data = req.body;
    try {
        await productManager.addProduct(data);
        return res.status(201).json({ status: 'success', message: 'Producto agregado exitosamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al agregar el producto', message: error.message });
    }
}

const updateProduct = async (req, res) => {
    const pid = req.params.pid;
    const data = req.body;
    try {
        const updatedProduct = await productManager.updateProduct(pid, data);
        return res.status(200).json({ status: 'success', payload: updatedProduct, message: 'Producto actualizado exitosamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el producto', message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const pid = req.params.pid;
    try {
        await productManager.deleteProduct(pid);
        return res.status(200).json({ status: 'success', message: 'Producto eliminado exitosamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el producto', message: error.message });
    }
}

const getProductDetails = async (req, res) => {
    const pid = req.params.pid;
    try {
        const productDetails = await productManager.getProductDetails(pid);
        return res.status(200).json({ status: 'success', payload: productDetails });
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener los detalles del producto', message: error.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
};