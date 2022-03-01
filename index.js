const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} is running`);
}
  
);