const express = require('express');
const Joi = require('joi');
const categories = require('./routes/categories');

const app = express();
app.use(express.json());
app.use('/api/categories', categories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} is running`);
  }
);