const express = require('express'
);
const { addProduct, removeProduct, singleProduct, listProduct } = require('../controllers/productController');
const upload = require('../middlewares/Multer');

const productRouter = express.Router();




productRouter.post("/add",upload.fields([{name:'image1',maxcount:1},{name:'image2',maxcount:1},{name:'image3',maxcount:1},{name:'image4',maxcount:1}]),addProduct);
productRouter.post("/remove",removeProduct);
productRouter.post("/single",singleProduct);
productRouter.get("/list",listProduct);


module.exports = productRouter;
