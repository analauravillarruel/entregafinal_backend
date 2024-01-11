const { Router } = require('express');
const ProductsController = require('../controllers/productsController');
const UserMiddleware = require('../middleware/userMiddleware');

const productRouter = new Router();
const productsController = new ProductsController();
const usersMiddleware = new UserMiddleware();

product.get('/',
  usersMiddleware.isAuth.bind(usersMiddleware),
  productsController.getAll.bind(productsController));

product.get('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  productsController.getProductById.bind(productsController));

product.post('/',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'), 
  productsController.createProduct.bind(productsController));

  product.put('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'),  
  productsController.updateProduct.bind(productsController));


product.delete('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'),
  productsController.deleteProduct.bind(productsController));

module.exports = product;