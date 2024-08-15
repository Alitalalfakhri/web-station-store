/*   the stategey is 
1- we gonna generate the html by javacript : 
 - in order placed time we need to get a date of clicking place 
  your order in checkout.js and we need to use it here
  - we can get the total price from paymentsummary.js
  - we gonna ignore the order id
 2 - we need to take every cart we get generate the html and 
  response with empty cart so in each order we get the cart 
   and generate the html for it and response empty one and 
   the loop stay like this


*/

import { cart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { renderPaymentSummary } from './checkout/paymetSummary.js';

let orderHTML;
function renderOrders(){
    let ordersCart = []
    ordersCart = cart;
    console.log(ordersCart)

ordersCart.forEach( (item) => {
   
    document.querySelector('.orders-grid').innerHTML = '';
    orderHTML += `
    <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$120</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
            <div class="product-image-container">
              <img src="images/products/athletic-cotton-socks-6-pairs.jpg">
            </div>

            <div class="product-details">
              <div class="product-name">
                Black and Gray Athletic Cotton Socks - 6 Pairs
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: 1
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>


        </div> `
        document.querySelector('.orders-grid').innerHTML += orderHTML
   
}); 
}
renderOrders() 