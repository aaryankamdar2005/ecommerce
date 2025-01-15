const express = require('express');
const { placeOrder, placeOrderstripe, placeOrderRazorpay, userOrders } = require('../controllers/orderController');
const authUser = require('../middlewares/Auth');

const orderRouter = express.Router();


orderRouter.post("/place",authUser,placeOrder);
orderRouter.post("/stripe",authUser,placeOrderstripe);
orderRouter.post("/razorpay",authUser,placeOrderRazorpay);
orderRouter.post("/userorders",authUser,userOrders);



module.exports = orderRouter;
