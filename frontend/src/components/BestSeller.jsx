import React, { useEffect,useContext } from 'react'
import { useState } from 'react'
import Title from './Title'
import { shopContext } from '../context/shopContext.jsx'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(shopContext);
  
const[bestseller,setbestseller]=useState([]);


const best = products.filter((item,index)=>{
  return item.bestseller === true;
})
useEffect(()=>{
setbestseller(best);
},[])
console.log(best);
  return (
    <div className='my-10'>
      <div className='text-3xl'>
        <Title  text1={"BEST"} text2={"SELLERS"}/>
      </div>
      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image?.[0]} // Safely access the first image
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
