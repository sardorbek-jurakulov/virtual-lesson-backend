const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true
  }
});

const Categories = mongoose.model("Categories", categorySchema);

async function createCategory() {
  const category = new Categories({
    name: "Ma'lumotlar ombori"
  });

  const createdCategory = await category.save();
  console.log(createdCategory);
}

router.get('/', async (req, res) => {
  const allCategories = await Categories.find().sort({name: 1});
  res.status(200).send(allCategories);
});

async function getCategor(id) {
  const findedCategory = await Categories.findById(id);

  if(findedCategory === Null) {
    return Null;
  } else {
    return findedCategory;
  }
}

router.get('/:id', async (req, res) => {
  const findedCategory = await Categories.findById(req.params.id)
  if(!findedCategory) {
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");
  }
   res.status(200).send(findedCategory);
});

router.post('/', async (req, res) => {
  const { error } = categoryValidator(req.body); 
  if( error ) {
    return res.status(400).send(error.details[0].message);
  }
  let category = new Categories({
    name: req.body.name
  });
  category = await category.save();
  res.status(201).send(category);
});

router.put('/:id', async (req, res) => {
  const { error } = categoryValidator(req.body);
  if( error ) {
    return res.status(400).send(error.details[0].message);
  }
  const updatingCategory = await Categories.findById(req.params.id);
  if(!updatingCategory) {
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");
  }
  updatingCategory.name = req.body.name;
  const updatedCategory = updatingCategory.save();
  res.status(200).send(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  const deletedCategory = await Categories.findByIdAndRemove(req.params.id);
  if(!deletedCategory) {
    return res.status(404).send("Berilgan IDga teng bo'lgan toifa topilmadi");
  }
  res.status(200).send(deletedCategory);
});

function categoryValidator(validatingObject) {
  const categoryScheme = Joi.object({
    name: Joi.string().required().min(3),
  });

  return categoryScheme.validate(validatingObject);
}

module.exports = router;