import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();

const ShopContextProvider = (props) => {
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";
  const delivery_fee = 10;

  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  let cartData;

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  // Add to cart function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    cartData = structuredClone(cartItems) || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    try {
      if (token) {
        const response = await axios.post(
          `${backendurl}/api/cart/add`,
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Cart Add Response:", response.data);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      toast.error(error.message);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);
    }
    try {
      if (token) {
        const response = await axios.post(
          `${backendurl}/api/cart/update`,
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Update Cart Response:", response.data);
      }
    } catch (error) {
      console.error("Error updating cart:", error.message);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Get Cart Error:", error.message);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        totalCount += cartItems[items][size] || 0;
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {
        totalAmount += itemInfo.price * cartItems[items][size];
      }
    }
    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendurl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <shopContext.Provider value={value}>
      {props.children}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;
