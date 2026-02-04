const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: "https://seu-link-do-marketplace.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'NexBuy API running',
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
  });
});

const uploadsPath = path.join(__dirname, 'uploads'); 
app.use('/uploads', express.static(uploadsPath));

console.log('Imagens sendo servidas de:', uploadsPath);

app.use(routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} não encontrado`,
  });
});

app.use(errorHandler);

module.exports = app;
