document.addEventListener('DOMContentLoaded', () => {
    // 1. Group Filtering Functionality
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
  
  // Initially hide all burger items
  burgerItems.forEach(item => {
    item.style.display = 'none';
  });

  groupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const group = button.textContent.toLowerCase();
      burgerItems.forEach(item => {
        // Show all items if "all" is selected, otherwise filter by class.
        if (group === 'all' || item.classList.contains(group)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
    // 2. Add-to-Cart Functionality with Item Modification and Summary
    const cart = {}; // Objeto para almacenar los ítems del carrito
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
  
    // Updates the cart list and calculates subtotal & total (with delivery fee)
    function updateCartList() {
      cartList.innerHTML = ''; // Clear current list
      let subtotal = 0;
      for (const item in cart) {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item} - ${cart[item].quantity} x $${cart[item].price}
        <br><button class="increase" data-item="${item}">+</button>
        <button class="decrease" data-item="${item}">-</button>
        <button class="remove" data-item="${item}">Remove</button>
      `;
      cartList.appendChild(li);
      subtotal += cart[item].price * cart[item].quantity;
      }
      
      let summary = document.getElementById('cart-summary');
      // If cart is empty, remove summary element if it exists.
      if (subtotal === 0) {
      if (summary) {
        summary.remove();
      }
      document.getElementById("empty-cart-message").style.display = "block"; // Show empty cart message
      return;
      }
      
      const deliveryFee = 5;  // Fixed delivery fee
      const total = subtotal + deliveryFee;
      
      if (!summary) {
      summary = document.createElement('div');
      summary.id = 'cart-summary';
      // Insert summary right after the cart list
      cartList.insertAdjacentElement('afterend', summary);
      }
      
      summary.innerHTML = `
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Delivery: $${deliveryFee.toFixed(2)}</p>
      <p>Total: $${total.toFixed(2)}</p>
      `;

      document.getElementById("empty-cart-message").style.display = "none"; // Hide empty cart message
    }
  
    // Event delegation for modifying cart items (increase, decrease, remove)
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
  
    // 3. Toggle Shopping Cart Display
    const showCartButton = document.getElementById('show-cart');
    const cartContainer = document.getElementById('cart-container');
    
    // Hide the cart container initially
    cartContainer.style.display = 'none';
    showCartButton.addEventListener('click', () => {
      if (cartContainer.style.display === 'none' || cartContainer.style.display === '') {
      cartContainer.style.display = 'block';
      showCartButton.textContent = '❌';
      } else {
      cartContainer.style.display = 'none';
      showCartButton.textContent = '🛒';
      }
    });
  
    // Clear Cart Functionality
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

// Función para calcular el precio total del carrito
function calculateTotalPrice() {
  let total = 0;
  for (const item in cart) {
      total += cart[item].price * cart[item].quantity;
  }
  return total;
}

// Actualizar el valor del campo oculto "prices" antes de enviar el formulario
document.getElementById('hid').addEventListener('submit', function(event) {
  const totalPrice = calculateTotalPrice();
  document.getElementById('prices').value = totalPrice.toFixed(2); // Formatear a 2 decimales
});


const cart = {}; // Objeto para almacenar los ítems del carrito

// Función para calcular el precio total del carrito
function calculateTotalPrice() {
    let total = 0;
    for (const item in cart) {
        total += cart[item].price * cart[item].quantity;
    }
    return total;
}

// Actualizar el valor del campo oculto "prices" antes de enviar el formulario
document.getElementById('hid').addEventListener('submit', function(event) {
    const totalPrice = calculateTotalPrice();
    document.getElementById('prices').value = totalPrice.toFixed(2); // Formatear a 2 decimales
});

// Ejemplo de cómo se agregan ítems al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const burger = button.closest('.burger');
        const name = burger.getAttribute('data-name');
        const price = parseFloat(burger.getAttribute('data-price'));

        if (cart[name]) {
            cart[name].quantity += 1;
        } else {
            cart[name] = { price: price, quantity: 1 };
        }
        updateCartList(); // Actualizar la lista del carrito
    });
});

// Función para actualizar la lista del carrito (opcional)
function updateCartList() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Limpiar la lista actual

    for (const item in cart) {
        const li = document.createElement('li');
        li.textContent = `${item} - ${cart[item].quantity} x $${cart[item].price}`;
        cartList.appendChild(li);
    }
}
