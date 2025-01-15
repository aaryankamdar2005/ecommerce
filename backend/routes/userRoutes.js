const express = require('express');
const { loginUser, regUser, adminLogin } = require('../controllers/userController');


const router = express.Router();


router.post("/register",regUser);
router.post("/login",loginUser);
router.post("/admin",adminLogin);


module.exports= {
    router
}