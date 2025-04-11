const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config(); 
const { connectDb } = require('./config/mongodb');
const connectCloudinary = require('./config/cloudinary');
const { router } = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cookieParser = require('cookie-parser');
const cartRouter = require('./routes/cartRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB and Cloudinary
connectDb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://ecommerce-4t9k.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// API Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/user", router);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
