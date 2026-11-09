const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:4200')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ message: 'Origem não permitida pelo CORS.' });
  }

  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

const PORT = process.env.PORT || 3000;
const routes = require('./routes/routes');
app.use('/api', routes);

const mongoURL = process.env.MONGODB_URI || process.argv[2];

if (!mongoURL) {
  console.error('Configure MONGODB_URI ou informe a URI do MongoDB como argumento.');
  process.exit(1);
}

mongoose.connect(mongoURL)
  .then(() => {
    console.log('Database Connected');
    app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
  })
  .catch(error => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
