import React, { useContext, useEffect, useState } from 'react';
import { shopContext } from '../context/shopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { token, setToken, backendurl } = useContext(shopContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const onsubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let response;
      if (currentState === 'signup') {
        response = await axios.post(`${backendurl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendurl}/api/user/login`, {
          email,
          password,
        });
      }
      console.log("hello1");
      console.log(response.data.success);
console.log("hello2");
console.log(response);

      if (response.data.success) {
        const jwtToken = response.data.token;
        localStorage.setItem('token', jwtToken);
        setToken(jwtToken);
        toast.success(`${currentState === 'signup' ? 'Registered' : 'Logged in'} successfully`);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={onsubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl capitalize">{currentState}</p>
      </div>

      {currentState === 'login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />

      <div className="w-full flex justify-between text-sm">
        <p>Forgot your password?</p>
        {currentState === 'login' ? (
          <p className="cursor-pointer" onClick={() => setCurrentState('signup')}>
            Create account
          </p>
        ) : (
          <p className="cursor-pointer" onClick={() => setCurrentState('login')}>
            Login here
          </p>
        )}
      </div>

      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState}
      </button>
    </form>
  );
}

export default Login;
