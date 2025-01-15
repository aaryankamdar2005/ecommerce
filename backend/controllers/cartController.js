const express = require('express');
const userModel = require('../models/userModel');


const addToCart = async(req,res) => {
try {
    const {itemId,size} = req.body;
const user =req.user;

    const userData = await userModel.findById(user.id);
    let cartData = await userData.cartData;
    if(cartData[itemId]) {
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1;
        }
        else {
            cartData[itemId][size]=1;
        }
    }
    else {
        cartData[itemId]={};
        cartData[itemId][size]=1;

    }
    await userModel.findByIdAndUpdate(user.id,{cartData});

res.json({success:true,message:"added to cart"});

}
catch(error) {
res.json({succes:false,message:error.message});
}

}

const  updateCart = async(req,res) =>{
    try {
        const {itemId,size,quantity} = req.body;
        const user =req.user;
        
        
       
        const userData = await userModel.findById(user.id);
        let cartData = await userData.cartData;
        cartData[itemId][size]=quantity;


        await userModel.findByIdAndUpdate(user.id,{cartData});

        res.json({success:true,message:"cart updated"});
    }
    catch(error){
        res.json({succes:false,message:error.message});
    }
 


}

const getUserCart = async (req,res)=>{
   try {
    const {itemId,size,quantity} = req.body;
    const user =req.user;
    


    const userData = await userModel.findById(user.id);
    let cartData = await userData.cartData;
    res.json({success:true,cartData});

   }
   catch(error){
  res.json({succes:false,message:error.message});
   }

}

module.exports = { 
    addToCart,updateCart,getUserCart
}