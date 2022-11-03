const Joi = require('joi');
const mongoose = require('mongoose');

const Reporting = mongoose.model('Reporting', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  name:{
    type: String,
    required: true

  },
  issue: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      }
    }),
    required: true
  },
  location: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      }
    }),
    required: true
  },
  dateReported: {
    type: Date,
    required: true,
    default: Date.now
  },
}));

function validateReporting(reporting) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(50).required(),
    //userId: Joi.objectId().required(),
    //locationId: Joi.objectId().required(),
    //issueId: Joi.objectId().required()
    issueTitle: Joi.string().min(3).max(50).required(),
    locationName: Joi.string().min(3).max(50).required()
  });

  return schema.validate(reporting);
}


exports.Reporting = Reporting;
exports.validate = validateReporting;