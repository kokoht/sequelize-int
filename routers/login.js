var express = require('express');
var router = express.Router();

const Models = require('../models')
const crypto = require('crypto');
const hash = require('../helpers/hash')

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  let username = req.body.username
  let password = req.body.password
  Models.User.find({
    where: { username: username }
  })
  .then(user => {
    const secret = user.salt;
    const hashData = hash(secret, password);
    if(hashData == user.password){
      req.session.user = {
        username: user.username,
        role: user.role
      }
      res.redirect('/dashboard')
    } else {
      res.send('Wrong Password, Please Input Correct Password')
    }
  })
  .catch(err => {
    res.send('The User is not exist')
  })
});

module.exports = router;
