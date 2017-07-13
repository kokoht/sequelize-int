var express = require('express');
var router = express.Router();

// const DbModel = require('../models/dbmodel');
//const Teacher = require('../models/teacher');
// let dbModel = new DbModel('data.db');


router.get('/', function (req, res) {
  res.render('index')
})

module.exports = router
