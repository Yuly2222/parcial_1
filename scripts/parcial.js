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
    const cart = {};  // Object to keep track of cart items
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
          <button class="increase" data-item="${item}">+</button>
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
      cartContainer.style.display = cartContainer.style.display === 'none' || cartContainer.style.display === '' ? 'block' : 'none';
    });
  
    // Clear Cart Functionality
    const clearCartButton = document.getElementById('clear-cart');
    clearCartButton.addEventListener('click', () => {
      for (const item in cart) {
        delete cart[item];
      }
      updateCartList();
    });
  });
  