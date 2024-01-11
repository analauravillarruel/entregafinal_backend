class ProductMemory {
  constructor () {
    this.product = []
  }

  getAll () {
    return this.product
  }

  get (id) {
      const foundProduct = this.product.find(product => product.id === Number(id))
      return foundProduct
    }
    

  create (product) {
    
    product.id = this.product.length + 1

    this.product.push(product)

    return product
  }

  update (id, body) {
      let product = this.product.find(product => product.id === Number(id))
    
      if (!product) {
        return false
      }
    
      product = {...product, ...body}
    
      return product
    }
    

    delete (id) {
      let productIndex = this.product.findIndex(product => product.id === Number(id))
    
      if (productIndex === -1) {
        return false
      }
    
      this.product.splice(productIndex, 1)
    
      return true
    }
    

}

module.exports = ProductMemory;