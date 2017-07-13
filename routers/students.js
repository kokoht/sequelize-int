var express = require('express');
var router = express.Router();

const Models = require('../models');

router.get('/', function(req, res){
  Models.Student.findAll()
  .then(function(data){
    res.render('student', {
      panggilData: data
    })
  })
})

//================== insert di  /students/add
router.get('/add', function(req, res){
  res.render('addstudent')
})

router.post('/', function(req, res){
  Models.Student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    jurusan: req.body.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(function(){
    res.redirect('/students')
  })
})


//================= edit using sequelize syntax
router.get('/edit/:id', function(req, res){
  Models.Student.findById(req.params.id)
  .then(function(data){
    res.render('editstudent', {
      panggilData: data
    })
  })
})

router.post('/edit/:id', function(req,res){
  Models.Student.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    jurusan: req.body.jurusan
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/students')
  })
  });

// delete
router.get('/delete/:id', function(req, res){
  Models.Student.destroy({
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/students');
  })
});


//=================
module.exports = router
