
function goBack() {
    window.history.back();
}

function confirmGoBack() {
    if (window.confirm("Delivery confirmed. Go back to the main page?")) {
        goBack();
    }
}
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        totalPrice: params.get('prices')
    };
}


document.addEventListener('DOMContentLoaded', function() {
const queryParams = new URLSearchParams(window.location.search);
const totalPrice = queryParams.get('prices');
const productsString = queryParams.get('products');

// Muestra el precio total
document.getElementById('totalPrice').value = `$${totalPrice || "0.00"}`;

// Muestra los productos y sus cantidades
if (productsString) {
const products = productsString.split('|');
const productsList = document.createElement('div');
productsList.innerHTML = '<h3>Products in Cart:</h3>';
products.forEach(product => {
    const [name, quantity] = product.split('=');
    const decodedName = name.replace(/%20/g, ' '); // Decodifica espacios
    const productItem = document.createElement('p');
    productItem.textContent = `${decodedName} - Quantity: ${quantity}`;
    productsList.appendChild(productItem);
});
document.querySelector('.container').insertBefore(productsList, document.querySelector('.buttons'));
}
});


document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Purchase confirmed! Total Price: ' + document.getElementById('totalPrice').value);
});