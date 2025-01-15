import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex  gap-2 items-center mb-3 justify-center'> 
      <p className='text-gray-500 '> {text1}</p>
      <p className='text-gray-500 font-medium ' >{text2}</p>
   
      <p className='w-8  sm:w-12 h-[2px]  bg-gray-700 '></p>
    
    </div>
  )
}

export default Title
