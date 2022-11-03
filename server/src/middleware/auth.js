const { auth } = require('express-openid-connect');
const jwt = require('jsonwebtoken');

module.exports =  function (req, res, next) {
  //const token = req.cookies('auth_token');
  const token = req.cookies.auth_token;

  let message = null;

  if (!token) {
    message = 'Access denied. Please Login';
    return res.status(401).render('login', {message});
  }
  try {
    const decoded = jwt.verify(token, 'tanatswa');
    req.user = decoded;
    //console.log(req.user);
    next();
  }
  catch (ex) {
    message = 'Invalid token.'
    res.status(400).render('login', {message});
  }
}
