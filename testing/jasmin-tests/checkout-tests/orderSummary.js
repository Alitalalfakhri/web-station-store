import { renderOrderSummary } from "../../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../../data/cart.js";

describe('test suite: display the cart', () => {
  it('display the cart', () => {
  document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
  `;//the class name must be the same of the original renderordersummary() container(div)


    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
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
    renderOrderSummary()
    //check the amount of objects in the page⬇️
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    )
    .toEqual(2)
    //check the quantity of the object⬇️
    expect(document.querySelector(`.js-item-quantity${productId1}`).innerText).toContain('Quantity: 2')
    expect(document.querySelector(`.js-item-quantity${productId2}`).innerText).toContain('Quantity: 1')

  });
})
