const express = require('express');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');
const Stripe = require('stripe');

// Global variables
const currency = 'inr';
const deliveryCharge = 10;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// COD Order Placement
const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount: amount + deliveryCharge,
            PaymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Stripe Order Placement
const placeOrderstripe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items, amount, address } = req.body;
        const { origin } = req.headers;

        const orderData = {
            userId,
            items,
            address,
            amount,
            PaymentMethod: 'Stripe',
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: { name: item.name },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: { name: 'Delivery charge' },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// User Order Data
const userOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ userId }).lean();

        if (!orders.length) {
            return res.status(404).json({ success: false, message: 'No orders found' });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Export controllers
module.exports = {
    placeOrder,
    placeOrderstripe,
    placeOrderRazorpay: async (req, res) => {}, // Razorpay integration placeholder
    userOrders,
};
