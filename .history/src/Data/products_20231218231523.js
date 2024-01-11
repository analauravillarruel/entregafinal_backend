class ProductsDAOMemory {
  constructor () {
    this.products = [
      {
        title: "Samsung",
        price: 100,
        id: 1
      },
      {
        title: "iPHONE",
        price: 100,
        id: 2
      },
      {
        title: "",
        price: 100,
        id: 3
      },
      
    ]
  }

  getAll () {
    return Promise.resolve(this.products)
  }
}

module.exports = ProductsDAOMemory;