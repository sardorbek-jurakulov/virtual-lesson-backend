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

app.get('/api/categories/:id', (req, res) => {
  const requestedCategoryId = parseInt(req.params.id);
  const requestedCategory = categories.find(category => category.id === requestedCategoryId);
  res.status(200).send(requestedCategory);
});

app.post('/api/categories', (req, res) => {
  const { error } = categoryValidator(req.body);
  if( error ) {
    return res.status(400).send(error.details[0].message);
  }

  const newCategory = {
    id: categories.length + 1,
    name: req.body.name,
  };

  categories.push(newCategory);

  return res.status(201).send(categories[categories.length-1]);
});

app.put('/api/categories/:id', (req, res) => {
  const { error } = categoryValidator(req.body);

  if( error ) {
    return res.status(400).send(error.details[0].message);
  }

  const updatingCategoryId = parseInt(req.params.id);

  if(updatingCategoryId < 1 || updatingCategoryId > categories.length) {
    return res.status(400).send("Ko'rsatilgan ID ga ega bo'lgan categoriya topilmadi!");
  }

  const updatingCategoryIndex = categories.findIndex(category => category.id === parseInt(req.params.id));
  const updatedCategory = {
    id: updatingCategoryIndex+1,
    name: userDataSanitizator(req.body.name),
  }
  categories.splice(updatingCategoryIndex, 1, updatedCategory);
  return res.status(200).send(categories[updatingCategoryIndex]);
});

function categoryValidator(validatingObject) {
  const categoryScheme = Joi.object({
    name: Joi.string().required().min(3),
  });

  return categoryScheme.validate(validatingObject);
}

function userDataSanitizator(userData) {
  return userData.trim();
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port} is running`);
  }
);