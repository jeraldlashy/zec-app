const {Location, validate} = require('../models/location');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const locations = await Location.find().sort('name');
  //res.send(locations);
    res.render('locations', {locations});
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let location = new Location({ name: req.body.name });
  location = await location.save();


  //res.send(locations);
  res.redirect('/locations')
});

router.put('/:id',auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const location = await Location.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!location) return res.status(404).send('The location with the given ID was not found.');

  res.send(location);
});

router.delete('/:id', auth, async (req, res) => {
  const location = await Location.findByIdAndRemove(req.params.id);

  if (!location) return res.status(404).send('The location with the given ID was not found.');

  res.send(location);
});

router.get('/:id', auth, async (req, res) => {
  const location = await Location.findById(req.params.id);

  if (!location) return res.status(404).send('The location with the given ID was not found.');

  res.send(location);
});

module.exports = router;