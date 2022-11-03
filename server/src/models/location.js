const Joi = require('joi');
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  numberOfIssues: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 255
  }
});


const Location = mongoose.model('Location', locationSchema);

function validateLocation(location) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    numberOfIssues: Joi.number().min(0),

  });

  return schema.validate(location);
}

let location = new Location({ name: 'Sample' });
location.save();

exports.locationSchema = locationSchema;
exports.Location = Location;
exports.validate = validateLocation;