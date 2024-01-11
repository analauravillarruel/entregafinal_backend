const { Router } = require('express');
const ProductsController = require('../controllers/');
const UserMiddleware = require('../middleware/userMiddleware');

const productRouter = new Router();
const productsController = new ProductsController();
const usersMiddleware = new UserMiddleware();

productRouter.get('/',
  usersMiddleware.isAuth.bind(usersMiddleware),
  productsController.getAllProducts.bind(productsController));

productRouter.get('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  productsController.getProductById.bind(productsController));

productRouter.post('/',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'), 
  productsController.createProduct.bind(productsController));

  productRouter.put('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'),  
  productsController.updateProduct.bind(productsController));


productRouter.delete('/:id',
  usersMiddleware.isAuth.bind(usersMiddleware),
  usersMiddleware.hasRole('ADMIN'),
  productsController.deleteProduct.bind(productsController));

module.exports = productRouter;