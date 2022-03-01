const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

let categories = [
  {
    id: 1,
    name: "Dasturlash",
  }, 
  {
    id: 2,
    name: "DevOps",
  }, 
  {
    id: 3,
    name: "Tarmoq administratorligi",
  }, 
  {
    id: 4,
    name: "Axborot Xavfsizligi",
  }, 
  {
    id: 5,
    name: "Ma'lumotlar ombori",
  },
];

app.get('/api/categories', (req, res) => {
  res.status(200).send(categories);
});


function userDataSanitizator(userData) {
  return userData.trim();
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} is running`);
  }
);