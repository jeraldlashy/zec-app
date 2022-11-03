const {Reporting, validate} = require('../models/reporting');
const {Issue} = require('../models/issue');
const {User} = require('../models/user');
const auth = require('../middleware/auth');
const {Location} = require('../models/location');
const alert = require('../controllers/alert');
const mongoose = require('mongoose');
//const Fawn = require('fawn');
const mongoDb = require('mongodb');
const express = require('express');
const router = express.Router();

//fawnUrl = "mongodb://localhost:27017/ZecBase"
//Fawn.init(fawnUrl);

router.get('/', auth, async (req, res) => {
  const reportings = await Reporting.find().sort('-dateReported');
  const locations = await Location.find().sort('name');
  const issues = await Issue.find().sort('title');


  //res.send(reportings);
  res.render('reportings', {
    reportings,
    issues,
    locations,
  })
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);



  // const user = await User.findOne({'username': username});
  // if (!user) return res.status(400).send('Invalid user.');

  // const issue = await Issue.findById(req.body.issueId);
  // if (!issue) return res.status(400).send('Invalid issue.');

  // const location = await Location.findById(req.body.locationId);
  // if (!issue) return res.status(400).send('Invalid location.');

  const issue = await Issue.findOne({'title': req.body.issueTitle});
  if (!issue) return res.status(400).send('Invalid issue.');

  const location = await Location.findOne({'name': req.body.locationName});
  if (!location) return res.status(400).send('Invalid Location.');

  console.log(req.user)

  const user = await User.findOne({'username': req.user.username});
  if (!user) return res.status(400).send('No User Found Please Login.');

  const users = await User.find({'isAdmin': 'true'});
  let emails = [];
  users.map((user) => { emails.push(user.email)});


  const title = req.body.title;
  const description =req.body.description;
  const name = user.name;

  //if (issue.numberOfReports === 0) return res.status(400).send('Issue not in stock.');

  let reporting = new Reporting({
    title : title,
    description : description,
    name : name,
    issue: {
      _id: issue._id,
      title: issue.title,
    },
    location: {
      _id: location._id,
      name: location.name,
    },
  });

  // try {

  //   new Fawn.Task()
  //     .save('reportings', reporting)
  //     .update('issues', { _id: issue._id }, {
  //       $inc: { numberOfReports: +1 }
  //     })
  //     .run();

  //   res.send(reporting);
  // }
  // catch(ex) {
  //   res.status(500).send('Something failed.');
  // }

  reporting = await reporting.save();
  await issue.numberOfReports++;
  await location.numberOfIssues++;
  await issue.save();
  await location.save();

  message = " A new report was added";
  alert(message, emails);

  //res.send(reporting);
  res.redirect('/reportings')


  //implementing transaction
});

router.get('/:id',auth, async (req, res) => {
  const reporting = await Reporting.findOne({'_id':req.params.id});

  if (!reporting) return res.status(404).send('The reporting with the given ID was not found.');

  //res.send(reporting);
  res.render('reporting', {reporting});
});

module.exports = router;