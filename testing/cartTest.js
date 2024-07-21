import {addToCart , cart , loadFromStorage} from '../data/cart.js'
describe('test suit: the cart testing' , () => {
  it('add a new object to the cart' , () => {
    spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([])
    })
    
    loadFromStorage()
    addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e0' )
    expect(cart.length).toEqual(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)

    
  })
  it('add an exsisting objest to the cart' , () => {
    spyOn(localStorage,'setItem')
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e0',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    })
    addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e0')
    

     expect(cart[0].quantity).toEqual(2)

     
   
  })
})
