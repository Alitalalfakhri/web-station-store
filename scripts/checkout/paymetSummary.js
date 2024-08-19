import { cart } from '../../data/cart.js';
import { getProduct, loadProducts } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export let today;
export let productPriceCents;

export function renderPaymentSummary() {
    productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    // Save the total amount to local storage
    localStorage.setItem('orderTotalCents', totalCents);

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cart.length}):</div>
          <div class="payment-summary-money">
            $${formatCurrency(productPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}
          </div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">
            $${formatCurrency(totalBeforeTaxCents)}
          </div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">
            $${formatCurrency(taxCents)}
          </div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">
            $${formatCurrency(totalCents)}
          </div>
        </div>

        <button id="place-order-button" class="place-order-button button-primary js-date-order">
          Place your order
        </button>
    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    // Attach event listener after content is added
    document.getElementById('place-order-button').addEventListener('click', () => {
        today = dayjs().format('MMMM D, YYYY'); // Format the date
        console.log('Selected date:', today);

        // Save the date to local storage
        localStorage.setItem('orderDate', today);
        function generateRandomString(length){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
         let result = '';
        const charactersLength = characters.length;
    
        for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    }
    
    return result;
  }

    const randomString = generateRandomString(20);
    localStorage.setItem('randomId', randomString)
console.log(randomString);
// Generate a random string of 20 characters
      

        // Redirect to orders page
        window.location.href = "orders.html"; // Example redirection
    });

}