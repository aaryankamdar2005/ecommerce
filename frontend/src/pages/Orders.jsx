import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import Title from '../components/Title';
import axios from 'axios';

function Orders() {
  const {backendurl,coookieToken,products,currency} = useContext(shopContext);

  const[orderData,setOrderData] =useState([]);

  const loadOrder = async()=>{
    try {


const response  = await axios.post(backendurl + '/api/order/userorders',{},{
withCredentials:true,

})

if(response.data.success){
  let allOrdersItems =[]
  response.data.orders.map((order)=>{

    order.items.map((item)=>{
      item['status']=order.status
      item['payment']=order.payment.status
      item['paymentMethod']=order.paymentMethod.status
      item['date']=order.date
      allOrdersItems.push(item)
    })
  })
  setOrderData(allOrdersItems);
}


    }
    catch(error){

    }

  }
  useEffect(()=>{
loadOrder()
  },[])
  return (
    <div className='border-t pt-16 '>
      <div className='text-2xl'>
<Title text1={"MY"} text2={"ORDERS"}/>
      </div>
      <div>
        {
        orderData.slice(1,4).map((item,index)=>(
             <div  key={index} className='py-4 border-t border-b  text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm '>
<img  className='w-16 sm:w-20' src={item.image[0]}/>
<div>
  <p className='text-base font-medium'>{item.name}</p>
  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
    <p>{currency}</p>
    <p>Quantity: 1</p>
    <p>Size : M</p>

  </div>
</div>
              </div>

              </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
