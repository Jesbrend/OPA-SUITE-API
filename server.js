// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Recebendo ${req.method} na rota ${req.url} com body:`, req.body);
    next();
  })

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

app.use((err, req, res, next) => {
    console.error('Erro detectado:', err.message);
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
