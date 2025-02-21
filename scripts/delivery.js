document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const totalPrice = queryParams.get('prices'); // Obtén el total de la URL
    const productsString = queryParams.get('products');
  
    // Muestra el precio total en el campo totalPrice
    if (totalPrice) {
      document.getElementById('totalPrice').value = totalPrice;
    } else {
      document.getElementById('totalPrice').value = "0.00"; // Valor por defecto si no hay total
    }
  
    // Muestra los productos y sus cantidades
    if (productsString) {
      const products = productsString.split('|');
      const productsList = document.createElement('div');
      productsList.innerHTML = '<h3>Products in Cart:</h3>';
      products.forEach(product => {
        const [name, quantity] = product.split('=');
        const decodedName = decodeURIComponent(name); // Decodifica espacios
        const productItem = document.createElement('p');
        productItem.textContent = `${decodedName} - Quantity: ${quantity}`;
        productsList.appendChild(productItem);
      });
      document.querySelector('.container').insertBefore(productsList, document.querySelector('.buttons'));
    }
  });
  
  function goBack() {
    window.history.back();
  }
  
  document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Purchase confirmed! Total Price: ' + document.getElementById('totalPrice').value);
  });