import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadFromStorage , cart} from "../../../data/cart.js";
import { renderPaymentSummary } from "../../../scripts/checkout/paymetSummary.js";

describe('test suite: display the cart', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>"
  
  `;//the class name must be the same of the original renderordersummary() container(div)
    
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });

    loadFromStorage();
    renderOrderSummary();
  })
  
  it('display the cart', () => {
   

    //check the amount of objects in the page⬇️
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    )
    .toEqual(2)
    //check the quantity of the object⬇️
    expect(document.querySelector(`.js-item-quantity${productId1}`).innerText).toContain('Quantity: 2')
    expect(document.querySelector(`.js-item-quantity${productId2}`).innerText).toContain('Quantity: 1')
    
     
  });
  it('check the delet link' , () => {
   
    
    document.querySelector(`.js-item-delet${productId1}`).click()
    //check that the link deleted the div
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1)
     //check that the first object become deleted
    expect(document.querySelector(`js-cart-item-container-${productId1}`)).toEqual(null)
    //check that the second product not deleted
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    //checking the cart updated or not
    expect(cart[0].productId).toEqual(productId2)
   
   // document.querySelector('.js-payment-summary').innerHTML = '';
  })
})
afterEach(() => {
  document.querySelector('.js-test-container').innerHTML = '';
})