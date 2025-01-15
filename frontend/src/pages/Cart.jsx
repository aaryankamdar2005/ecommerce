import React, { useContext, useDebugValue, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';

function Cart() {
  const {products,currency,cartItems,updateQuantity,navigate} =useContext(shopContext);
  const[cartData,setCartData] = useState([]);
  useEffect(()=>{
const temp=[];
for(const items in cartItems){
  for(const item in cartItems[items]){
    if(cartItems[items][item]>0){
temp.push({
  _id:items,
  size:item,
  quantity:cartItems[items][item]
})
    }
  }
}
setCartData(temp);
  },[cartItems])
  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-2'>
<div className='flex items-start gap-6 '>
<img src={productData.image[0]} className='w-16 sm:w-20'/>
<div>
  <p >{productData.name}</p>
  <div className='flex gap-1 items-center'>
    <p>{currency}</p>
    <p>{productData.price}</p>
    <p className='px-2 sm:px-3 ml-2 sm:py-1 border bg-slate-50'>{item.size}</p>
  </div>
</div>
  </div>
  <input className='max-w-28 py-1 px-2 outline-none border border-r-gray-200'type="number" min={1} defaultValue={item.quantity}/>
  <img onClick={()=>{
    updateQuantity(item._id,item.size,0)
  }} src={assets.bin_icon}  className='w-4 mr-4 sm:w-5 cursor-pointer'/>
                </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
        <CartTotal/>

        </div>

      </div>
      <div className=' flex justify-center sm:justify-end' >
      <button  onClick={()=>{ navigate('/placeorder')}}className='bg-black text-white px-4 py-4 font-medium'>Proceed To Checkout</button>
      </div>
    </div>
  )
}

export default Cart
