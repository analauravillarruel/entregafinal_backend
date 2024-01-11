// console.log('Hola')

// const nameInput = document.getElementById('nameInput')
// const codeInput = document.getElementById('codeInput')
// const stockInput = document.getElementById('stockInput')
// const priceInput = document.getElementById('priceInput')
// const productForm = document.getElementById('productForm')
// const sendButton = document.getElementById('sendButton')


// productForm.addEventListener('submit', e => {
//   e.preventDefault()

//   const title = nameInput.value
//   const code = codeInput.value
//   const stock = stockInput.value
//   const price = priceInput.value
//   console.log({ title, code, stock, price })

//   fetch('/api/products', {
//     method: 'POST',
//     body: JSON.stringify({ title, code, stock, price }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
// })

// const deleteProduct = id => {
//   console.log(id)

//   fetch(`/api/products/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
// }

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.addToCartBtn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const productId = button.getAttribute('data-product-id');
      // Realiza una solicitud POST al servidor para agregar el producto al carrito
      try {
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ quantity: 1 }) // Cambia la cantidad según tus necesidades
        });

        if (response.ok) {
          // Producto agregado al carrito exitosamente
          // Puedes mostrar una notificación o actualizar la vista del carrito si es necesario
        } else {
          console.error('Error al agregar al carrito:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    });
  });
});