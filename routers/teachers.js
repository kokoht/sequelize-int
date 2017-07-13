var express = require('express');
var router = express.Router();

const Models = require('../models');


router.get('/', function(req, res){
  Models.Teacher.findAll()
  .then(function(data){
    res.render('teacher', {
      panggilData: data
    })
  })
})













module.exports = router
