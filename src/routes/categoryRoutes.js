// src/routes/categoryRoutes.js
const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/CategoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createCategory); 
router.get('/', authMiddleware, getAllCategories); 
router.get('/:id', authMiddleware, getCategoryById); 
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);

module.exports = router;
