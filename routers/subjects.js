var express = require('express');
var router = express.Router();

const Models = require('../models');

router.get('/', function(req, res){
  Models.Subject.findAll()
  .then(function(data){
    res.render('subject', {
      panggilData: data
    })
  })
})


module.exports = router
