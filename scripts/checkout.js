import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymetSummary.js';
import { loadProducts} from '../data/products.js';
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
