// src/controllers/AuthController.js
const User = require('../models/User');
const hashGenerator = require('../services/hashGenerator');
const generateToken = require('../utils/generateToken');


const registerUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    const hashedPassword = await hashGenerator(password);
    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = generateToken(user._id);
    return res.status(200).json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login.' });
  }
};


const updateUser = async (req, res) => {
  const { id } = req.params; 
  const { username, password } = req.body; 
  
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    
    if (username) user.username = username;
    if (password) user.password = await hashGenerator(password); 

    await user.save(); 

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!', user });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    return res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};


const deleteUser = async (req, res) => {
  const { id } = req.params; 
  
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (err) {
    console.error('Erro ao deletar usuário:', err);
    return res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser };

