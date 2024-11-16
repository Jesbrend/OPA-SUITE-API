// src/controllers/CategoryController.js
const Category = require('../models/Category');


const createCategory = async (req, res) => {
  const { name } = req.body;
  
  try {
    const category = new Category({ name });
    await category.save();
    return res.status(201).json({ message: 'Categoria criada com sucesso!', category });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar categoria.' });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter categorias.' });
  }
};


const getCategoryById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao obter categoria.' });
  }
};


const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    
    return res.status(200).json({ message: 'Categoria atualizada com sucesso!', category });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar categoria.' });
  }
};



const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada.' });
    }
    
    return res.status(200).json({ message: 'Categoria deletada com sucesso!' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar categoria.' });
  }
};

module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };