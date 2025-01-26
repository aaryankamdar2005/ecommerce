const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config(); 
const {connectDb} = require('./config/mongodb');
const connectCloudinary = require('./config/cloudinary');
const { router } = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');
const allowedOrigins = ['http://localhost:5173']; // Add your frontend URL here




const app =express();
app.use(express.json());
const PORT=process.env.PORT || 4000;
connectDb();
connectCloudinary();

//midlewares 

app.use(cookieParser());
//cors
app.use(cors({
    origin:allowedOrigins,
    credentials: true, // Allow cookies and other credentials
}));

// api endpoints 
app.get("/",(req,res)=>{
    res.send("working ");
})
app.use("/api/user",router);
app.use("/api/product",productRouter);
app.use("/api/cart",cartRouter);

app.use("/api/order",orderRouter);





app.listen(PORT,()=>{
    console.log("server started");
})

