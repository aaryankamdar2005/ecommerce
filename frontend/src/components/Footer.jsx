import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <>
    <div className='flex-column place-items-center my-4 sm:flex place-items-center justify-between mt-4 '>
      <div>
        <img className=' h-12 ' src={assets.logo}/>
        <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Quia reprehenderit vitae consequuntur minima non repellendus, </p>
      </div>
      <div className=' my-4'>
  <h1 className='font-bold text-xl mb-6'>Company</h1>
  <p className='text-gray-600
  '>Home</p>
  <p className='text-gray-600
  ' >About Us</p>
  <p className='text-gray-600
  ' >Delivery</p>
  <p className='text-gray-600
  ' >Privacy Policy</p>
      </div>
      <div className=' my-4' >
        <h1 className='font-bold text-xl mb-6' >Get in Touch</h1>
        <p className='text-gray-600
  ' >+1-000-000-0000</p>
<p className='text-gray-600
  ' >xyz@gmail.com</p>
<p className='text-gray-600
  ' >Instagram</p>
      </div>
   
    </div>
    <hr className='bg-gray-500 w-full'/>
      
    <p className='py-5 text-sm text-center'>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
    </>
    
  )
}

export default Footer
