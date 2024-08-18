import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { loadProducts } from '../data/products.js';

// Create an object to store selected quantities
const selectedQuantities = {};

loadProducts(renderHomeGrid);

function renderHomeGrid() {
  let productsHTML = '';

  function renderselect(productId) {
    return ` 
      <div class="product-quantity-container">
        <select class="js-product-quantity" data-product-id="${productId}">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>`;
  }

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${formatCurrency(product.priceCents)}
        </div>

        ${renderselect(product.id)}
        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  // Add event listeners for Select dropdowns
  document.querySelectorAll('.js-product-quantity').forEach((select) => {
    select.addEventListener('change', (event) => {
      const productId = event.target.dataset.productId;
      const quantity = parseInt(event.target.value, 10);
      selectedQuantities[productId] = quantity;
      console.log(`Selected value for product ${productId}: ${quantity}`);
    });
  });

  // Add event listeners for Add to Cart buttons
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = selectedQuantities[productId] || 1; // Default to 1 if no selection
      console.log(`Adding product ${productId} with quantity ${quantity} to cart`);
      addToCart(productId, quantity);
      updateCartQuantity();
    });
  });

  updateCartQuantity();
}

function updateCartQuantity() {
  let cartQuantity = 0;

  // Accumulate quantity from cart
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity; // Assuming cartItem has quantity property
  });

  console.log(`Total cart quantity: ${cartQuantity}`);

  document.querySelector('.js-cart-quantity').textContent = cartQuantity;

  // init-user-id.js

// Function to generate a unique ID
function generateUniqueId(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Initialize and set the user ID in local storage
(function initializeUserId() {
  // Check if user_id already exists in local storage
  if (!localStorage.getItem('user_id')) {
      // No ID found, generate a new one and store it
      const userId = generateUniqueId(20);
      localStorage.setItem('user_id', userId);
  }
})();

}
