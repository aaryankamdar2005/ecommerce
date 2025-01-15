import React, { useCallback, useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { shopContext } from '../context/shopContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Placeorder() {
  const[method,setMethod] =useState('cod');
  const {backendurl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(shopContext);

const[formData,setFormData] = useState({
  firstName: '',
  lastName : '',
  email: '',
  street: '',
  city: '',
  state:'',
  zipcode: '',
  country:'',
  phone:''
});

const onChangeHandler = (event)=>{
  event.preventDefault();
const name = event.target.name;
const value = event.target.value;
setFormData(data => ({...data,[name]:value}));

}
const onSubmitHandler = async(event)=>{
  event.preventDefault();
  try {
let orderItems =[];
for(const items in cartItems){
  for(const item in cartItems[items]){
    if(cartItems[items][item]>0){
      const itemInfo = structuredClone(products.find(product => product._id === items));
      if(itemInfo){
        itemInfo.size = item;
        itemInfo.quantity = cartItems[items][item];
        orderItems.push(itemInfo);
      }
    }
  }
}
let orderData = {
  address:formData.street,
  items:orderItems,
  amount:getCartAmount() + delivery_fee,
  


}

switch(method) {
  
  case 'cod' : 


  const response = await axios.post(backendurl + '/api/order/place',{  address:formData.street,
    items:orderItems,
    amount:getCartAmount() + delivery_fee,
    },{
    withCredentials:true
  });

  console.log(response.data);
  if(response.data.success){
    setCartItems({});
    navigate('/orders');
  }
  else {
    toast.error(response.data.message);
  }
  break;
case 'stripe' :
  const responseStripe = await axios.post(backendurl + '/api/order/stripe',orderData,{
    withCredentials:true
  })

  if(responseStripe.data.success){
    const {session_url}=responseStripe.data;
    window.location.replace(session_url);

  }
  else {
    toast.error(responseStripe.data.message);
  }
  break;

  default:
    break;

}
  }
  catch(error){
console.log(error);
console.log(error.message);

  }

}

  const navigate = useNavigate();
  return (

   
    <form onSubmit={onSubmitHandler} >
    <div className=' border-t'></div>
    <div className='flex flex-col sm:flex-row justify-between my-2 '>
      <div className=' mt-4 '>
        <div className='text-3xl my-2' >
    <Title  text1={"Delivery"} text2={"Information"} />
    </div>
<div className=' flex flex-col  sm:flex-row gap-4 my-3 '>
<input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-200 px-1 my-1 py-2 rounded-md' placeholder='first name'/>
<input required onChange={onChangeHandler}  name='lastName' value={formData.lastName} className='border border-gray-200 px-1 py-2 my-1 rounded-md' placeholder='last name'/>
</div>
<input required onChange={onChangeHandler}  name='email' value={formData.email} className='border border-gray-200 px-1 my-3 w-full py-2 rounded-md' placeholder='email Address'/>
<input  required onChange={onChangeHandler} name='street' value={formData.value} className='border border-gray-200 px-1 my-3 w-full py-2 rounded-md' placeholder='street'/>
<div required className=' flex flex-col  sm:flex-row gap-4  '>
<input required onChange={onChangeHandler}  name='city' value={formData.city} className='border border-gray-200 px-1 my-3 py-2 rounded-md' placeholder='city'/>
<input required onChange={onChangeHandler}  name='state' value={formData.state} className='border border-gray-200 px-1 py-2 my-3 rounded-md' placeholder='state'/>
</div>
<div className=' flex flex-col  my-3 sm:flex-row gap-4  '>
<input required onChange={onChangeHandler}  name='zipcode' value={formData.zipcode} className='border border-gray-200 px-1 my-1 py-2 rounded-md' type='Number'  placeholder='Pin code  '/>
<input required onChange={onChangeHandler}  name='country' value={formData.country} className='border  border-gray-200 px-1 py-2 my-1 rounded-md'  placeholder='country'/>
</div>
<input required onChange={onChangeHandler}  name='phone' value={formData.phone} className='border border-gray-200 px-1 my-1 w-full py-2 rounded-md' placeholder='phone'/>
    </div>

    <div>
    <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
        <CartTotal/>

        </div>

      </div>
      <div className='flex flex-col my-2 sm:flex-row  gap-3 '>
        <div onClick={()=>{
          setMethod('razor')
        }} className='border flex justify-center items-center rounded-sm gap-1 border-gray-300 py-2 px-4'>    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razor' ? 'bg-green-400' : '  '}`}></p> <img src={assets.razorpay_logo}/></div>
        <div onClick={()=>{
          setMethod('stripe')
        }}  className='border flex justify-center items-center border-gray-300 gap-1 py-2 px-4'>  <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : '  '}`}></p> <img src={assets.stripe_logo}/></div>
        <div  onClick={()=>{
          setMethod('cod')
        }}  className='border flex-2 gap-1 border-gray-300 py-2 px-2 flex items-center justify-center'>
       <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : '  '}`}></p><p className='text-sm font-md text-gray-600'>CASH ON DELIVERY</p>
      </div>
      </div>
      <div className=' flex justify-center sm:justify-end ' >
      <button type='submit' className='bg-black text-white px-16  text-sm my-2 rounded-md py-2 font-medium'>Place Order</button>
      </div>

    </div>
    </div>
    </form>
  )
}

export default Placeorder
