const Joi = require('joi');
const mongoose = require('mongoose');
//const {categorySchema} = require('./category');

const Issue = mongoose.model('Issues', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  // category: {
  //   type: categorySchema,
  //   required: true
  // },
  numberOfReports: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 255
  }
}));

function validateIssue(issue) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    //categoryId: Joi.objectId().required(),
    numberOfReports: Joi.number().min(0),
  });

  return schema.validate(issue);
}


const issue = new Issue({
  title: "Sample"
});

issue.save();

exports.Issue = Issue;
exports.validate = validateIssue;