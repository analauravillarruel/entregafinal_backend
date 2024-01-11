document.getElementById('addToCartForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const cid = document.getElementById('cid').value;
  const pid = document.getElementById('pid').value;

  // Realizar la solicitud POST con los valores de cid y pid
  const data = { cid, pid };

  fetch('/ruta_de_tu_servidor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});