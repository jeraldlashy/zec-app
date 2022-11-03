// const Joi = require('joi');
// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 5,
//     maxlength: 50
//   },
//   numberOfIssues: {
//     type: Number,
//     required: true,
//     default: 0,
//     min: 0,
//     max: 255
//   }
// });

// const Category = mongoose.model('Category', categorySchema);

// function validateCategory(category) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).required(),
//     numberOfIssues: Joi.number().min(0),

//   });

//   return schema.validate(category);
// }

// exports.categorySchema = categorySchema;
// exports.Category = Category;
// exports.validate = validateCategory;