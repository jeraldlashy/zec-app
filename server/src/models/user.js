const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50
  },
  password :{
    type: String
  }

});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin,name: this.name, username: this.username }, 'tanatswa');
  return token;
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    isAdmin: Joi.boolean(),
    password: Joi.string().min(6).max(12).required()
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;