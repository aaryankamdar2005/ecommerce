import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/shopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
function Collection() {
  const {products} = useContext(shopContext);
  const [showFilter,setShowFilter] = useState(false);
const [filterproducts,setFilterProducts]=useState([]);

const[multiplevalues,setMultipleValues]=useState([]);

const demo= (value)=>{
  console.log(value);
  setMultipleValues((prev) => [...prev, value]);

  const cat = products.filter((item,index)=>{
    return  item.category == value

  })
  setFilterProducts(cat);
}
useEffect(()=>{
setFilterProducts(products);

},[])
  return (

    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter */}

      <div className='min-w-60 '>
<p  onClick={()=>{
  setShowFilter(!showFilter)
}} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters 
  <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90 ' : ''}`} src={assets.dropdown_icon}/>
</p>
{/* {category filter} */}
<div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden sm:block'}`}>
<p className='mb-3 text-sm font-medium'>Categories</p>
<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
<p className='flex gap-2 '><input className='w-3 'type='checkbox' value={'Men'} onChange={(e)=>{
  if(e.target.checked == true){
    demo(e.target.value)
  }

}}/>Men</p>
<p className='flex gap-2 '><input className='w-3 'type='checkbox' value={'Women'}  onChange={(e)=>{
 if(e.target.checked == true){
  demo(e.target.value)
}
}} />Women</p>
<p className='flex gap-2 '><input className='w-3 'type='checkbox' value={'Kids'} onChange={(e)=>{
 if(e.target.checked == true){
  demo(e.target.value)
}
}} />Kids</p>
</div>
</div>
 {/* {subCategory filter} */}
 <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden sm:block'}`}>
<p className='mb-3 text-sm font-medium'>Type</p>
<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
<p className='flex gap-2 ' ><input  className='w-3 'type='checkbox' value={'topwear'}/>Topwear</p>
<p className='flex gap-2 '><input className='w-3 'type='checkbox' value={'bottomwear'}/>Bottomwear</p>
<p className='flex gap-2 '><input className='w-3 'type='checkbox' value={'winterwear'}/>Winterwear</p>
</div>
</div>
      </div>
     
     {/* {rightSide} */}
     <div className='flex-1'>
      <div className='flex justify-between text-base sm:text-2xl mb-4 '>
<Title text1={"All"} text2={"Collections"}/>
{/* {product sort} */}
<select className='border-2 rounded-md border-gray-500 text-sm px-2 '><option value="relevant">Relevant</option>
<option value="low-high">low to high</option>
<option value="high-low">high to low </option></select>
     </div>

     {/* {mapproducts} */}
    
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
     {filterproducts.map((item, index) => (
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
    </div>
  )
}

export default Collection
