import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.exchange_icon}/>
        <p className='font-semibold'>Easy Exchange</p>
        <p className='text-gray-400'>We offer hassle free  exchange</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.quality_icon}/>
        <p className='font-semibold'>Easy Exchange</p>
        <p className='text-gray-400'>We offer hassle free  exchange</p>
      </div>
      <div>
        <img className='w-12 m-auto mb-5' src={assets.support_img}/>
        <p className='font-semibold'>Easy Exchange</p>
        <p className='text-gray-400'>We offer hassle free  exchange</p>
      </div>
    </div>
  )
}

export default OurPolicy
