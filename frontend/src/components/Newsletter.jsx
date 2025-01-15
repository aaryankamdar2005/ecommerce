import React from 'react'

const Newsletter = () => {
  const onSubmitHandler =(event) =>{
    event.preventDefault();
    
  }
  return (
      <div className='text-center'>
   
              <p className='font-semibold'>Subscribe Now and get 20% off</p>
              <p className='text-gray-400'>We offer hassle free  exchange</p>
             
            
          
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
              <input className='w-full sm:flex-1 outline-none ' placeholder='ENTER YOUR EMAIL'/>
              <button type='submit' className=' bg-black text-white text-xs font-medium px-10 py-4'>Subscribe Now</button>
              </form>
              </div>

  )
}

export default Newsletter
