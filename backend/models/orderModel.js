const mongoose = require('mongoose');

const orderSchema  = new mongoose.Schema({
userId: {type:String,required:true},
items: {type:Array,required:true},
amount:{type:Number,required:true},
address: {type:Object,required:true},
status: {type:String,required:true,default:'Order Placed'},
paymentMethod: {type:String,required:true,default: 'COD'},
payment: {type:Boolean,required:true,default:false},
date: {type:Number, required:true},
});

const orderModel = new mongoose.model("order",orderSchema);

module.exports=orderModel;
