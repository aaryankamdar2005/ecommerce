import React, { useContext, useDebugValue, useEffect } from 'react';
import { useState } from 'react';
import { shopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

function Login() {
  const { token, setToken, backendurl,cookieToken,setCookieToken} = useContext(shopContext);
const navigate = useNavigate();

  const [currentState, setCurrentState] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(()=>{
    if(cookieToken){
   
  navigate('/');  
    }
  },[cookieToken,navigate])

  const onsubmitHandler = async (event) => {
    event.preventDefault();
console.log("hi");

    try {


      if (currentState === 'signup') {
        const response = await axios.post(
          backendurl+'/api/user/register',
          { name, email, password });

        console.log('Response:', response);
        console.log('Response data:', response.data.token);
        if(response.data.success){
          Cookies.set('token', response.data.token, { expires: 7, path: '/',domain: 'localhost'  });
          
          setCookieToken(Cookies.get('uid'));
          // console.log(Cookies.get('uid'));
        }
        else {
          toast.error(response.data.message)
        }
      } else {
        // login 
        const response = await axios.post(backendurl + '/api/user/login',{email,password});
        console.log('Response:', response);
        console.log('Response data:', response.data);
        if(response.data.success){
          Cookies.set('uid', response.data.token, { expires: 7, path: '/' ,domain: 'localhost' });
          setCookieToken(Cookies.get('uid'));
          console.log(Cookies.get('uid'));
        }
        else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log('Error:', error);

      if (error.response) {
        console.log('Response error:', error.response.data);
      }
    }
  };

  return (
    <form onSubmit={onsubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
      </div>
      {currentState === 'login' ? '' : <input onChange={(e) => { setName(e.target.value); }} value={name} type="text" name="name" className="w-full px-3 py-2 border border-gray-800 " placeholder="Name" />}
      <input onChange={(e) => { setEmail(e.target.value); }} type="text" value={email} className="w-full px-3 py-2 border border-gray-800 " placeholder="Email" />
      <input onChange={(e) => { setPassword(e.target.value); }} type="Password" value={password} className="w-full px-3 py-2 border border-gray-800 " placeholder="Password" />
      <div className="w-full flex justify-between text-sm">
        <p>Forgot your password ?</p>
        {currentState === 'login'
          ? <p onClick={() => { setCurrentState('Sign Up'); }}>create account</p>
          : <p onClick={() => { setCurrentState('login'); }}>login here</p>}
      </div>
      <button type='Submit'  className="bg-black text-white font-light px-8 py-2 mt-4">{currentState}</button>
    </form>
  );
}

export default Login;
