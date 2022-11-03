const {Issue, validate} = require('../models/issue');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const issues = await Issue.find().sort('name');
  //res.send(issues);
  res.render('issues', {issues});
});


router.post('/',auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);


  const issue = new Issue({
    title: req.body.title,
  });

  await issue.save();

  const issues = await Issue.find().sort('name');
  res.render('issues' , {issues})
  //res.send(issue);
});

/*
router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // const category = await Category.findById(req.body.categoryId);
  // if (!category) return res.status(400).send('Invalid category.');

  const issue = await Issue.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      // category: {
      //   _id: category._id,
      //   name: category.name
      // },
    }, { new: true });

  if (!issue) return res.status(404).send('The issue with the given ID was not found.');

  res.send(issue);
});

router.delete('/:id',auth, async (req, res) => {
  const issue = await Issue.findByIdAndRemove(req.params.id);

  if (!issue) return res.status(404).send('The issue with the given ID was not found.');

  res.send(issue);
});
*/

router.get('/:id', auth,async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) return res.status(404).send('The issue with the given ID was not found.');

  res.send(issue);
});

module.exports = router;