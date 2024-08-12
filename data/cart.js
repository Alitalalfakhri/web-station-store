//import { svalue } from '../scripts/amazon.js';

export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += parseInt(quantity, 10);
  } else {
    cart.push({
      productId: productId,
      quantity: parseInt(quantity, 10),
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find(item => item.productId === productId);
  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}
