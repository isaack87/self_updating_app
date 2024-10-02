const express = require('express');
const versionRoutes = require('./routes/versionRoutes');
const app = express();
require('dotenv').config(); 

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/version', versionRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://${HOST}:${PORT}`);
});