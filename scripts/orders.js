import { cart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { Myproducts } from '../data/products.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';
import { getProduct } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let ordersCart = JSON.parse(localStorage.getItem('ordersCart')) || [];
const userId = localStorage.getItem('user_id');
console.log(userId);

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
    
    // Save ordersCart to local storage
    localStorage.setItem('ordersCart', JSON.stringify(ordersCart));

    const orderDate = localStorage.getItem('orderDate');
    const orderTotalCents = localStorage.getItem('orderTotalCents');
    const orderId = localStorage.getItem('randomId');

    const headerHTML = `
        <div class="order-header-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-total">
                        <div class="order-header-label">Last order value:</div>
                        <div>${formatCurrency(orderTotalCents)}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">YOUR ID:</div>
                    <div>${userId}</div>
                </div>
            </div>
        </div>
    `;

    let orderDetailsHTML = '';

    ordersCart.forEach((item) => {
        const productId = item.productId;
        const matchingItem = getProduct(productId);
        const deliveryOptionId = item.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const matchingProduct = Myproducts.find(product => item.productId === product.id);
        let dateDifrence = deliveryDate.diff(today , 'day');
        let status
        //the function of checking the status of object
       
         if(dateDifrence >= 4){
            status = 'working on'
        }else if(dateDifrence >= 2){
            status = 'final tochs'
        }
        else if (dateDifrence === 1){
            status = 'on the road'
        }else{
            status = 'delivered'

        }   
    
    
        
        orderDetailsHTML += `
            <div class="order-details-grid">
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                </div>
                <div class="product-details">
                    <div class="product-name">${matchingProduct.name}</div>
                    <div class="product-delivery-date">Arriving on / Arrived on: ${dateString}</div>
                    <div class="product-quantity">Quantity: ${item.quantity}</div>
                    <div class="product-quantity">status : ${status}</div>
                </div>
                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">Track package</button>
                    </a>
                </div>
            </div>
        `;
    })

    const ordersHTML = `
        <div class="order-section">
            ${headerHTML}
            ${orderDetailsHTML}
        </div>
    `;

    const ordersGrid = document.querySelector('.orders-grid');
    if (ordersGrid) {
        ordersGrid.innerHTML = ordersHTML;
    } else {
        console.error('Element with class .orders-grid not found.');
    }

    // Clear the cart
    cart.length = 0;
    localStorage.removeItem('cart');
}

// Call the function to render orders
window.onload = () => {
    renderOrders()
    console.log('the page loaded')
}