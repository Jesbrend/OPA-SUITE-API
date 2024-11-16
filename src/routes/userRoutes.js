// src/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, deleteUser, updateUser } = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser); 
router.delete('/:id', deleteUser); 
router.put('/:id', updateUser); 

module.exports = router;


