import { cart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { Myproducts } from '../data/products.js';
let ordersCart = JSON.parse(localStorage.getItem('ordersCart')) || [];

console.log('Initial cart:', cart);
console.log('Initial ordersCart from local storage:', ordersCart);

export function renderOrders() {
    // Add items from cart to ordersCart without linking them
    cart.forEach(item => {
        // Check if the item already exists in ordersCart
        const existingItem = ordersCart.find(orderItem => orderItem.productId === item.productId);
        if (!existingItem) {
            // Deep copy the item and add to ordersCart
            ordersCart.push(JSON.parse(JSON.stringify(item)));
        }
    });
    console.log('Orders cart after adding items:', ordersCart);

    // Save ordersCart to local storage
    localStorage.setItem('ordersCart', JSON.stringify(ordersCart));

    const orderDate = localStorage.getItem('orderDate');
    const orderTotalCents = localStorage.getItem('orderTotalCents');
    const orderId = localStorage.getItem('randomId');

    const headerHTML = `
        <div class="order-header-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDate}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>${formatCurrency(orderTotalCents)}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div>
                </div>
            </div>
        </div>
    `;

    let orderDetailsHTML = '';

    ordersCart.forEach((item) => {
        const matchingProduct = Myproducts.find(product => item.productId === product.id);

        if (matchingProduct) {
            orderDetailsHTML += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="${matchingProduct.image}">
                    </div>
                    <div class="product-details">
                        <div class="product-name">${matchingProduct.name}</div>
                        <div class="product-delivery-date">Arriving on: August 15</div>
                        <div class="product-quantity">Quantity: ${item.quantity}</div>
                    </div>
                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">Track package</button>
                        </a>
                    </div>
                </div>
            `;
        }
    });

    const ordersHTML = `
        <div class="order-section">
            ${headerHTML}
            ${orderDetailsHTML}
        </div>
    `;

    const ordersGrid = document.querySelector('.orders-grid');
    if (ordersGrid) {
        ordersGrid.innerHTML = ordersHTML;
        console.log('Orders rendered successfully.');
    } else {
        console.error('Element with class .orders-grid not found.');
    }

    // Clear the cart
    cart.length = 0;
    localStorage.removeItem('cart');
    console.log('Cart after clearing:', cart);
}

// Call the function to render orders
renderOrders();