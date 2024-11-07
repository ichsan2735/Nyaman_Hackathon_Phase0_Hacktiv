// Initialize cart from localStorage or empty array if none exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format number to Rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID').format(number);
}

// Add item to cart
function addToCart(name, price) {
    let found = false;
    
    // Check if item exists in cart
    for (let item of cart) {
        if (item.name === name) {
            item.quantity += 1;
            found = true;
            break;
        }
    }

    // If item is not found, add it as new item
    if (!found) {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    alert(`${name} added to cart!`);
}

// Remove item from cart
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(name, change) {
    for (let item of cart) {
        if (item.name === name) {
            const newQuantity = item.quantity + change;
            if (newQuantity <= 0) {
                removeFromCart(name);
            } else {
                item.quantity = newQuantity;
            }
            break;
        }
    }
    saveCart();
    updateCartDisplay();
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    Your cart is empty. 
                    <br>Return to shop to add products.
                </div>`;
            return;
        }
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>
                    <h3>${item.name}</h3>
                    <p>Rp ${formatRupiah(item.price)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.name}', 1)">+</button>
                    <button class="button" onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Update total price
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = formatRupiah(calculateTotal());
    }
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});