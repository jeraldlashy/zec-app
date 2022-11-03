const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
    message = null;
    res.render('login', {message})
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  let message = null
  if (error) {
    message = error.details[0].message;
    return res.status(400).render('login', {message});
  }

  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    message = 'Invalid username or password.';
    return res.status(400).render('login', {message});
  }

  console.log(user);
  const validPassword = await bcrypt.compare(req.body.password, user.password);



  if (!validPassword) {
    message = 'Invalid email or password.'
    return res.status(400).render('login', {message})
  }


  const token = user.generateAuthToken();
  res.cookie('auth_token', token);
  res.redirect('/');
  // res.set('auth_token', token).
  //res.send(token);
  //res.render('index', {token});
  //res.send(token);7
});

function validate(req) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(req);
}

router.get('/signout', (req, res) => {
  let message = "Please Login Again"
  //res.render('login', {message});
  console.log("Signed Out");
  res.clearCookie("auth_token");
  res.redirect('/auth');
});

module.exports = router;