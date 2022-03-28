const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');

const app = express();

const dbConnection = config.get("dbConfig");

mongoose.connect(dbConnection)
  .then(() => {
    console.log('Ma\'lumotlar omboriga ulanish muvaffaqiyatli amalga oshirildi');
  })
  .catch((err) => {
    console.log('Ma\'lumotlar omboriga ulanish muvaffaqiyatli amalga oshirilmadi', err);
  });

app.use(express.json());
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} is running`);
  }
);