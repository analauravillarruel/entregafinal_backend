class CartStorage {
  constructor() {
    this.carts = [];
  }

  getAll() {
    return this.carts;
  }

  get(id) {
    const cart = this.carts.find(cart => cart.id === id);
    return cart;
  }

  create() {
    const newCart = {
      id: this.carts.length + 1,
      products: [],
    };
    this.carts.push(newCart);
    return newCart;
  }

  addProduct(cartId, productId) {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (!cart) {
      throw new Error('No se encuentra el carrito');
    }

    const productToAdd = {
      product: productId,
      quantity: 1,
    };

    const existingProductInCart = cart.products.find(product => product.product === productId);
    if (existingProductInCart) {
      existingProductInCart.quantity++;
    } else {
      cart.products.push(productToAdd);
    }

    return cart;
  }
}

module.exports = CartStorage;