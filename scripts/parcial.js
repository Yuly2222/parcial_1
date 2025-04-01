document.addEventListener('DOMContentLoaded', () => {
  // Filtrado de hamburguesas por grupo
  const groupButtons = document.querySelectorAll('.groups button');
  const burgerItems = document.querySelectorAll('.burger-options .burger');
  
  groupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const group = button.textContent.toLowerCase();
      burgerItems.forEach(item => {
        if (item.classList.contains(group)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

// Ocultar items de hamburguesas al cargar la página
burgerItems.forEach(item => {
  item.style.display = 'none';
});

  // Agregar elementos al carrito
  const cartList = document.getElementById('cart-list');

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const burger = button.closest('.burger');
      const name = burger.getAttribute('data-name');
      const price = parseFloat(burger.getAttribute('data-price'));
      
      if (cart[name]) {
        cart[name].quantity += 1;
      } else {
        cart[name] = { price: price, quantity: 1 };
      }
      updateCartList();
    });
  });

  // Actualiza la lista del carrito con precios y cantidades
  function updateCartList() {
    cartList.innerHTML = ''; // Clear current list
    let subtotal = 0;
    for (const item in cart) {
    const li = document.createElement('li'); // Create list item
    li.innerHTML = `
      ${item} - ${cart[item].quantity} x $${cart[item].price}
      <br><button class="increase" data-item="${item}">+</button>
      <button class="decrease" data-item="${item}">-</button>
      <button class="remove" data-item="${item}">Remove</button>
    `; // Agregar botones para aumentar, disminuir y eliminar en el InnerHTML
    cartList.appendChild(li);
    subtotal += cart[item].price * cart[item].quantity;
    }
    
    let summary = document.getElementById('cart-summary');
    // Si el carrito está vacío, mostrar mensaje de carrito vacío y ocultar resumen
    if (subtotal === 0) {
    if (summary) {
      summary.remove();
    }
    document.getElementById("empty-cart-message").style.display = "block";
    return;
    }
    
    const deliveryFee = 5;  // Envío fijo de $5
    const total = subtotal + deliveryFee; // Calcular total
    
    // Si no existe el resumen, crearlo y agregarlo después de la lista del carrito
    if (!summary) {
    summary = document.createElement('div');
    summary.id = 'cart-summary';
    cartList.insertAdjacentElement('afterend', summary);
    }
    
    summary.innerHTML = `
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Delivery: $${deliveryFee.toFixed(2)}</p>
    <p>Total: $${total.toFixed(2)}</p>
    `; // Actualiza el resumen con los precios en el InnerHTML

    document.getElementById("empty-cart-message").style.display = "none"; // Oculta el mensaje de Carrito Vacío
  }

  // Propiedades de los botones del carrito (aumentar, disminuir y eliminar)
  cartList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
      const itemName = target.getAttribute('data-item');
      if (target.classList.contains('increase')) {
        cart[itemName].quantity += 1;
      } else if (target.classList.contains('decrease')) {
        if (cart[itemName].quantity > 1) {
          cart[itemName].quantity -= 1;
        } else {
          delete cart[itemName];
        }
      } else if (target.classList.contains('remove')) {
        delete cart[itemName];
      }
      updateCartList();
    }
  });

  // Boton para mostrar/ocultar el carrito flotante
  const showCartButton = document.getElementById('show-cart');
  const cartContainer = document.getElementById('cart-container');
  cartContainer.style.display = 'none';// Ocultar el carrito al cargar la página

  // Cambiar el texto del botón y mostrar/ocultar el carrito al hacer clic
  showCartButton.addEventListener('click', () => {
    if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
    cartContainer.style.display = 'block';
    showCartButton.textContent = '❌';
    } else {
    cartContainer.style.display = 'none';
    showCartButton.textContent = '🛒';
    }
  });

  // Eliminar todos los elementos del carrito con clear-cart
  const clearCartButton = document.getElementById('clear-cart');
  clearCartButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    for (const item in cart) {
      delete cart[item];
    }
    updateCartList();
  });
});

function updateCartMessage() {
  let cartList = document.getElementById("cart-list");
  let emptyMessage = document.getElementById("empty-cart-message");

  if (cartList.children.length === 0) {
      emptyMessage.style.display = "block"; // Show message
  } else {
      emptyMessage.style.display = "none"; // Hide message
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartMessage);

// Also update when an item is added or removed
document.getElementById("clear-cart").addEventListener("click", function() {
  document.getElementById("cart-list").innerHTML = ""; // Clear all items
  updateCartMessage();
});



const cart = {}; // Objeto para almacenar los ítems del carrito


// Botón del SUBMIT >:((
document.getElementById('hid').addEventListener('submit', function(event) {
  
  const totalPrice = calculateTotalPrice();
  document.getElementById('prices').value = totalPrice.toFixed(2); // Actualiza el campo oculto

  // Crear una cadena con los productos y sus cantidades
   let products = [];
   for (const item in cart) {
       const name = encodeURIComponent(item); // Codifica el nombre del producto
       const quantity = cart[item].quantity;
       products.push(`${name}=${quantity}`);
   }
   const productsString = products.join('|'); // Usa '|' como separador seguro

   // Actualiza el campo oculto de products
   document.getElementById('products').value = productsString;

   // Guardar los datos del carrito en localStorage
   const cartItems = [];
   for (const item in cart) {
       cartItems.push({ product: item, quantity: cart[item].quantity, price: cart[item].price });
   }
   localStorage.setItem('cartItems', JSON.stringify(cartItems));

   // Redirige a la página de entrega con los parámetros en la URL
   window.location.href = `delivery.html?prices=${totalPrice.toFixed(2)}&products=${productsString}`;
});

// Función para calcular el precio total del carrito
function calculateTotalPrice() {
  let total = 0;
  for (const item in cart) {
      total += cart[item].price * cart[item].quantity;
  }
  total += 5.00;
  return total;
}