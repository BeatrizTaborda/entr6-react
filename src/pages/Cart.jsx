import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, setCart } from '../store/slices/cart.slice';
import CartProd from '../components/cart/CartProd';
import './styles/cart.css';
import { postPurchasesThunk } from '../store/slices/purchases.slice';
import { useNavigate } from 'react-router-dom';


const Cart = () => {

  const cart = useSelector(store => store.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
   dispatch(getCartThunk('/cart'));
  }, []);
  
  const handleBuy = () => {
    dispatch(postPurchasesThunk(''));
    dispatch(setCart([]));
  
    navigate('/purchases');
  }

  return (
    <>
    <div className='cart'>
    {
     cart?.map(prod => (
        <CartProd
          key={prod.id}
          prod={prod}
        />
      ))
    }
    </div>
    <div className='cart__totals'>
      <p className='cart__prod'>Total Products: {cart.reduce((ca, pr) => {
        return ca + pr.quantity;
      }, 0)}</p>
      <p className='cart__price'>Total Price: $ {cart.reduce((ca, pr) => {
        return ca + pr.quantity * pr.product?.price;
      }, 0)}</p>
      <button onClick={handleBuy}>Buy</button>
    </div>
    </>
  )
}

export default Cart;