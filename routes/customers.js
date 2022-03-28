const express = require('express');
const config = require('config');
const Joi = require('joi');
const router = express.Router();

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
    trim: true
  },
  isVip: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 11,
    trim: true
  }
});

const Customers = mongoose.model("Customers", customersSchema);

route.get('/', async (req, res) => {
  const customers = await Customers.find().sort({name: 1});
  res.status(200).send(customers);
});

route.post('/', (req, res) => {
  const { error } = customerValidator(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }
  
});

function customerValidator(validatingObject) {
  const categorySchema = Joi.object({
    name: Joi.string().required().min(2),
    isVip: Joi.boolean(),
    phone: Joi.string().required().min(7).max(11)
  });
}


module.exports = router;