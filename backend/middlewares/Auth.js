const express = require('express');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    try {
        const isValid = jwt.verify(token, process.env.SECRET_KEY);

        if (!isValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        req.user = isValid;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

module.exports = authUser;
