import React from 'react';
import Cart from "../assets/cart.png";

const CartWidget = () => {
  return (
    <div id='cart-icon-container'>
      <img src={Cart} alt="Cart shop" title='Cart shop' className='cart-icon'/>
      <span className='count-cart'>1</span>
    </div>

  )
}

export default CartWidget