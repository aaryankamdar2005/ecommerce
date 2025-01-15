import React from 'react'
import{Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Placeorder from './pages/Placeorder';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <>
  
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <ToastContainer/>
      <Navbar/>
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/collection' element={<Collection/>}></Route>
<Route path='/about' element={<About/>}></Route>
<Route path='/cart' element={<Cart/>}></Route>

<Route path='/contact' element={<Contact/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/orders' element={<Orders/>}></Route>

<Route path='/placeorder' element={<Placeorder/>}></Route>
<Route path='/product/:productId' element={<Product/>}></Route>
</Routes>
<Footer/>
    </div>
    </>
  )
}

export default App
