import React, { useContext } from 'react'
import { shopContext } from '../context/shopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} =useContext(shopContext);
    console.log(getCartAmount());
    
  return (
    <div className='w-full'>
        <div className='text-2xl'>
<Title  text1={"CART"} text2={"TOTALS"}/>
        </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
<div className='flex justify-between'>
    <p>Subtotal</p>
<p className=''>{currency} {getCartAmount()}</p>

</div>
<div className='border-t'></div>
<div className='flex justify-between'>
    <p>Shipping fee</p>
<p>{currency} {delivery_fee}</p>    
</div>
<div className='border-t'></div>

<div className='flex justify-between'>
    <p>Total</p>
<p>{currency}  {getCartAmount()+delivery_fee}</p>    
</div>
      </div>
      
    </div>
  )
}

export default CartTotal
