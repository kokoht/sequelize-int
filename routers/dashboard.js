var express = require('express');
var router = express.Router();
const Models = require('../models');
const util = require('../helpers/util.js');

router.get('/', function(req, res, next) {
  let activeUser = req.session.user
  let options = util.manageRole(activeUser.role)
  res.render('dashboard', { activeUser: activeUser, options: options });
});

router.get('/', function(req, res, next) {
  let activeUser = req.session.user
  let options = util.manageRole(activeUser.role)
  if(!activeUser.role) {
    res.sendStatus(403);
  } else {
    res.render('dashboard', { activeUser: activeUser, options: options });
  }
});

module.exports = router;
