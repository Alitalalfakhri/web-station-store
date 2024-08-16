
import { cart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import { Myproducts, products , getProduct} from '../data/products.js';

export function renderOrders() {
    
    const orderDate = localStorage.getItem('orderDate');
    const orderTotalCents = localStorage.getItem('orderTotalCents');
    const orderId =  localStorage.getItem('randomId');
    
    const headerHTML = `
        <div class="order-header-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDate}</div> <!-- Dynamic date -->
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>${formatCurrency(orderTotalCents)}</div> <!-- Dynamic total price -->
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div> <!-- Placeholder if not used -->
                </div>
            </div>
        </div>`
    ;

    let orderDetailsHTML = '';

    // Generate details for each item in the cart
    cart.forEach((item) => {
        let matchingProduct
        Myproducts.forEach((product) => {
           if (item.productId === product.id){
             matchingProduct = product;
           
           }
        })
        
        orderDetailsHTML += `
      
            <div class="order-details-grid">
                <div class="product-image-container">
                    <img src="${matchingProduct.image}">
                   
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: August 15
                    </div>
                    <div class="product-quantity">
                        Quantity: ${item.quantity}
                    </div>
                    
                </div>

                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            </div>
   `     ;
    });

    // Combine header and item details
    const ordersHTML = `
        <div class="order-section">
            ${headerHTML}
            ${orderDetailsHTML}
        </div>`
    ;

    // Update the DOM with the combined HTML
    document.querySelector('.orders-grid').innerHTML = ordersHTML;

    // Clear the cart
    cart.length = 0;
    console.log(cart);

    return cart;
}

// Call the function to render orders
renderOrders();