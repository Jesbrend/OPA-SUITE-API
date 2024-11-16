// src/controllers/ProductController.js
const Product = require('../models/Product');
const mongoose = require('mongoose');


const createProduct = async (req, res) => {
  const { name, price, category, description, amount } = req.body; 

  try {
    
    const product = new Product({ name, price, category, description, amount }); 
    await product.save();
    return res.status(201).json({ message: 'Produto criado com sucesso!', product });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar produto.', error: error.message }); 
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter produtos.' });
  }
};


const getProductById = async (req, res) => {
  const { id } = req.params;

 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
    const product = await Product.findById(id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter produto.' });
  }
};


const updateProduct = async (req, res) => {
  const { id } = req.params; 
  const { name, price, description, amount, category } = req.body; 

 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido.' });
  }

  try {
   
    const product = await Product.findByIdAndUpdate(
      id, 
      { name, price, description, amount, category }, 
      { new: true } 
    );

   
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    
    return res.status(200).json({ message: 'Produto atualizado com sucesso!', product });
  } catch (error) {
  
    return res.status(500).json({ message: 'Erro ao atualizar produto.', error: error.message });
  }
};


const deleteProduct = async (req, res) => {
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
    return res.status(500).json({ message: 'Erro ao deletar produto.' });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };

