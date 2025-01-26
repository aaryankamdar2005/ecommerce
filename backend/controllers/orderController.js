const express = require('express');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const Stripe = require('stripe');

// global variables
const currency = 'inr'
const deliveryCharge = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// code method 

const placeOrder =async(req,res)=> {
  try {

    const user =req.user;
    const {items,amount,address} = req.body;
    

    const userId = user.id;

    const orderData ={
        userId,
        items,
        address,
        amount,
        PaymentMethod:'COD',
        payment:false,
        date:Date.now(),

    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId,{cartData: {}});

    res.json({success:true,message:"order placed"});



  }
  catch(error){
    res.json({success:false,message:error.message});
  }

}

// stripe method

const  placeOrderstripe = async(req,res)=>{
try{
    const user =req.user;
    const userId = user.id;
    const {items,amount,address} = req.body;
    const {origin}=req.headers;

  const orderData ={
        userId,
        items,
        address,
        amount,
        PaymentMethod:'Stripe',
        payment:false,
        date:Date.now(),

    }
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item)=>({
        price_data: {
            currency:currency,
            product_data : {
                name:item.name
            },
            unit_amount:item.price*100 
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data: {
            currency:currency,
            product_data : {
                name:"delivery charge"
            },
            unit_amount:deliveryCharge*100 
        },
        quantity:1

    })
const session = await stripe.checkout.sessions.create({
    success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url:`${origin}/verfiy?success=false&orderId=${
        newOrder._id
    }`,

    line_items,
    mode:'payment',
})
res.json({success:true,session_url:session.url})

}
catch(error){
    res.json({success:false,message:error.message});
}
}

// razorpay

const placeOrderRazorpay = async(req,res)=>{

}

// user order data 

const userOrders = async(req,res)=> {

      try {
      
        const user =req.user;
        const userId= user.id;
        console.log(userId)
        const orders = await orderModel.find({userId:userId});
        console.log(orders);
        res.json ({success:true,orders});


      }
      catch(error){
        res.json({success:false,message:error.message});
      }
}

module.exports = {

    placeOrder,placeOrderstripe,
    placeOrderRazorpay,userOrders

}