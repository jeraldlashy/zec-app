const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const issues = require('./src/routes/issue');
const users = require('./src/routes/user');
const reportings = require('./src/routes/reporting');
const locations = require('./src/routes/location');
const dashboard = require('./src/routes/dashboard');
const auth = require('./src/routes/auth');
const cookieParser = require('cookie-parser');


const path = require('path');
const app = express();


require('dotenv').config();

mongoose.connect('mongodb://localhost/ZecBasePlay')
    .then(() => console.log('Connected…'))
    .catch(err => console.error('Connection failed…'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/issues', issues);
app.use('/users', users);
app.use('/reportings', reportings);
app.use('/locations', locations);
app.use('/', dashboard);
app.use('/auth', auth);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));
app.set('views',  __dirname +'/src/views');



const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT}`)
});