const express = require('express');
const router = express.Router();

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

app.get('/', (req, res) => {
  res.status(200).send(categories);
});

app.get('/:id', (req, res) => {
  const requestedCategoryId = parseInt(req.params.id);
  const requestedCategory = categories.find(category => category.id === requestedCategoryId);
  res.status(200).send(requestedCategory);
});

app.post('/', (req, res) => {
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

app.put('/:id', (req, res) => {
  const { error } = categoryValidator(req.body);

  if( error ) {
    return res.status(400).send(error.details[0].message);
  }

  if(userIdParamValidator(req.params.id) === "invalid") {
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

app.delete('/:id', (req, res) => {
  if(userIdParamValidator(req.params.id) === "invalid") {
    return res.status(400).send("Ko'rsatilgan ID ga ega bo'lgan categoriya topilmadi!");
  }
  const updatingCategoryIndex = categories.findIndex(category => category.id === parseInt(req.params.id));
  categories.splice(updatingCategoryIndex, 1, );
  return res.status(200).send(categories);
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

function userIdParamValidator(id) {
  const updatingCategoryId = parseInt(id);

  return (updatingCategoryId < 1 || updatingCategoryId > categories.length) ? "invalid" : "valid"
}

module.exports = router;