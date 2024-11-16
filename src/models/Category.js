// src/models/Category.js
const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true,  
    minlength: 3,  
    maxlength: 100  
  },
  description: { 
    type: String, 
    maxlength: 500,  
    default: '' 
  }
}, { timestamps: true });


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
