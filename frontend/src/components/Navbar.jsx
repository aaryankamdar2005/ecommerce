import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/frontend_assets/assets.js';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { shopContext } from '../context/shopContext.jsx';
import Cookies from 'js-cookie';

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    getCartCount,
    setCartItems,
    cookieToken,
    setCookieToken,
  } = useContext(shopContext);

  const navigate = useNavigate();

 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !cookieToken) {
      setCookieToken(storedToken);
    }
  }, [cookieToken, setCookieToken]);

  const logout = () => {
    localStorage.removeItem('token'); 
    setCookieToken(null); 
    setCartItems({});
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <img src={assets.logo} alt="log" className="w-36" />
      <ul className="hidden lg:flex gap-5 text-sm text-gray-700 ">
        <NavLink to="/" className="flex flex-col ">
          <p>HOME</p>
          <hr className="w-10 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col ">
          <p>COLLECTION</p>
          <hr className="w-10 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col ">
          <p>ABOUT</p>
          <hr className="w-10 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col ">
          <p>CONTACT</p>
          <hr className="w-10 border-none bg-gray-700 h-[1.5px] hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-5 cursor-progress" />
        <div className="group relative">
          <Link to="/login">
            <img
              onClick={() => {
                if (!cookieToken) navigate('/login');
              }}
              src={assets.profile_icon}
              className="w-5 cursor-progress"
            />
          </Link>

          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            {cookieToken && (
              <div className="flex flex-col bg-slate-50 gap-2 w-36 py-3 px-5">
                <p>My Profile</p>
                <p onClick={() => navigate('/orders')}>Orders</p>
                <p onClick={logout}>Logout</p>
              </div>
            )}
          </div>
        </div>

        <NavLink to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 cursor-progress" />
          <p className="absolute right-1 left-3 bottom-3 bg-black w-5 h-5 text-white rounded-full flex items-center justify-center">
            {getCartCount()}
          </p>
        </NavLink>

        <img
          src={assets.menu_icon}
          onClick={() => {
            setVisible(true);
          }}
          className="w-5 cursor-pointer lg:hidden"
        />

        <div
          className={`absolute top-0 right-0 overflow-hidden bg-white transition-all ${
            visible ? 'w-full' : 'w-0'
          }`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              onClick={() => {
                setVisible(false);
              }}
              className="flex items-center gap-4 p-3"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
              />
              <p>back</p>
            </div>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-collapse"
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-collapse"
              to="/collection"
            >
              Collection
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-collapse"
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              onClick={() => setVisible(false)}
              className="py-2 pl-6 border-collapse"
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
