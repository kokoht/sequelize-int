var express = require('express');
var router = express.Router();

const Models = require('../models');

router.get('/', function(req, res){
  Models.Student.findAll({
    order: [['first_name', 'asc']]
  })
  .then(function(data){
    console.log(data);
    res.render('student', {
      panggilData: data,
      pageTitle: "Student's"
    })
  })
})

//v1.. dontknow blm jln.. kemungkinan butuh promise all.. ?
// router.get('/:id/addsubject', function(req,res){
//   Models.Student.findAll({
//     include: [{all:true}]
//     // subject nya masih berbentuk array ( ga lgs sejajar.. )
//     // jadi kudu pake cara satune.. utk lgs akses array dlm
//   })
//   .then(studentsubject => {
//     console.log('aaa',studentsubject);
//     studentsubject.forEach( ssObject => {
//       console.log('bbb',JSON.stringify(ssObject, null, 2));
//       console.log('ccc',ssObject);
//       // btw klo mo ngetes conjunction dari sini lgs isa..
//       // include n console lgs keliatan..
//       res.render('addsubjecttos', {
//         panggilData: ssObject
//       })
//     })
//   })
// })

//====cara biasa,, add di halaman addsubjecttos
router.get('/:id/addsubject', function(req, res){
  Models.Student.findById(req.params.id)
  .then(function(data){
    Models.Subject.findAll()
    .then(function(data2){
      res.render('addsubjecttos', {panggilData: data, panggilDataDropdown: data2})
    })
  })
})

router.post('/:id/addsubject', function(req, res){
  Models.StudentSubject.create({
    StudentId: req.params.id,
    SubjectId: req.body.SubjectId
  })
  .then(function(){
    res.redirect('/students')
  })
})









//satu lagi post utk handle yg atas..
//  redirect /students lagi







//mo nampilin data student, dibawah e subject berupa dropdown..




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
  .catch(err => {
    res.render('errorpage', {
	     panggilData: err.message}
      )
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
  .catch(err => {
    res.render('errorpage', {
	     panggilData: err.message}
      )
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
