import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

export const shopContext = createContext();

const ShopContextProvider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const currency = '$';
    const delivery_fee = 10;

    const [cartItems, setCartItems] = useState({});
    const [cookieToken, setCookieToken] = useState(Cookies.get('uid')); 

    const navigate = useNavigate();
let cartData;

    useEffect(() => {
        const token = Cookies.get('uid'); 
        setCookieToken(token); 
    
        if (token) { 
            getUserCart(token); 
            setCartItems(cartData); 
        }
    }, []); 
    

    // Add to cart function
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("select product size");
            return;
        }

       cartData = structuredClone(cartItems) || {}; 

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);

        try {
            if (cookieToken) {
                console.log(cookieToken);
                const response = await axios.post(
                    backendurl + '/api/cart/add',
                    { itemId, size }, // Payload sent in the body
                    {
                        withCredentials: true, // Ensure cookies are sent with the request
                    }
                );
                console.log("Response:", response.data);
            }
        } catch (error) {
            console.error("Error adding to cart:", error.message);
        }
    };

    // Cart count function
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalCount += cartItems[items][item];
                }
            }
        }
        return totalCount;
    };

// when we refresh the cartgets  updated from database  

const getUserCart =async(token)=>{
    try {
const response = await axios.post(backendurl + '/api/cart/get',{},{
    withCredentials:true,

});
if(response.data.success) {
    setCartItems(response.data.cartData);
   
}
    }
    catch(error){
        console.error( error.message);
        toast.error(error.message);
    }
}


    // Update cart quantity function
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
        }
        try {
            if (cookieToken) {
                console.log(cookieToken);
                const response = await axios.post(
                    backendurl + '/api/cart/update',
                    { itemId, size ,quantity }, // Payload sent in the body
                    {
                        withCredentials: true, // Ensure cookies are sent with the request
                    }
                );
                console.log("Response:", response.data);
            }
        } catch (error) {
            console.error("Error adding to cart:", error.message);
            toast.error(error.message);
        }
    };

    // Get cart amount function
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            }
        }
        return totalAmount;
    };

    // Context value object
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
        cookieToken,
        setCookieToken,
        setCartItems,   
    };

    return (
        <shopContext.Provider value={value}>
            {props.children}
        </shopContext.Provider>
    );
};

export default ShopContextProvider;
