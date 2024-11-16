// src/routes/productRoutes.js
const Product = require('../models/Product');
const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');
const mongoose = require('mongoose');
const router = express.Router();

router.post('/', authMiddleware, createProduct); 

router.get('/', authMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  
  try {
    const products = await Product.find()
      .skip((page - 1) * limit) 
      .limit(Number(limit)) 
      .populate('category');

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter produtos.', error: error.message });
  }
});


router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter produto.', error: error.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, amount, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
  
    const product = await Product.findByIdAndUpdate(id, { name, description, price, amount, category }, { new: true });
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json({ message: 'Produto atualizado com sucesso!', product });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar produto.', error: error.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    return res.status(200).json({ message: 'Produto deletado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar produto.', error: error.message });
  }
});

module.exports = router;
