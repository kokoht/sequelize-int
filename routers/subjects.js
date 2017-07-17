var express = require('express');
var router = express.Router();

const Models = require('../models');
const grading = require('../helpers/grade')


// router.get('/', function(req, res){
//   Models.Subject.findAll()
//   .then(function(data){
//     res.render('subject', {
//       panggilData: data
//     })
//   })
// })

// v1 - msh salah...
// router.get('/', function(req, res){
//  Models.Subject.findAll()
//  .then(function(subjectInRows) {
//    let promises = subjectInRows.map(subjectObject => {
//      return new Promise (function (resolve, reject){
//        subjectObject.getTeachers()
//        .then(teacherObject => {
//          if(subjectObject.TeacherId == null){
//            subjectObject.subject_name = 'belum dpt tugas'
//          } else {
//            subjectObject.subject_name = teacherObject.subject_name;
//          }
//          return resolve(subjectObject)
//        })
//        .catch(err => reject(err))
//      })
//    })
//    Promise.all(promises)
//    .then(function(subjectObject){
//      res.render('subject', {
//        panggilData: subjectObject
//         })
//       })
//     })
//  })

// v2 - msh salah..
// router.get('/', function(req, res){
//  Models.Subject.findAll({
//    include: Models.Teachers
//  })
//  .then(function(subjectInRows) {
//    console.log('fff',subjectInRows.first_name);
//    let promises = subjectInRows.map(subjectObject => {
//      return new Promise (function (resolve, reject){
//        subjectObject.getTeachers()
//        .then(teacherObject => {
//let arrTeacher = []       kepake
//         //  if(subjectObject.TeacherId == null){
//         //    subjectObject.subject_name = 'belum dpt tugas'
//         //  } else {
//         //    subjectObject.subject_name = teacherObject.subject_name;
//         //  }
//  subjectObject.teachers = arrTeacher.push(teacherObject.name)        kepake
//         console.log('----',teacherObject);
//         console.log('aaa',resolve(subjectObject));
//          return resolve(subjectObject)
//        })
//        .catch(err => reject(err))
//      })
//    })
//    Promise.all(promises)
//    .then(function(subjectObject){
//      console.log('ddd',subjectObject);
//      res.render('subject', {
//        panggilData: subjectObject
//         })
//       })
//     })
//  })

//v3
router.get('/', function(req, res) {
  Models.Subject.findAll({
      include: {model: Models.Teacher}
      })
  .then((data1) => {
  //  console.log('zzzz', JSON.stringify(data1));
    res.render('subject', {panggilData: data1,
    pageTitle: "Subject's"})
  })
});

//
// db.Subject.findAll({include: {model: db.Teacher}})
// nanti hasilnya itu di object Subject nya bakal ada Teachers, yang bentuknya sudah objek

//============= start here ============

router.get('/:id/enrolledstudents', function(req, res){
  //console.log('ttt',Models.StudentSubject);
  Models.StudentSubject.findAll({
    order: [['Student', 'first_name', 'ASC']],
     where: {
       SubjectId: req.params.id
     },
    include: [{all: true}]
  })
  .then(function(data){
    console.log('xxx',data);
    let grade = grading(data)
      res.render('enrolled', {panggilData: data, panggilGrade: grade
      })
  })
})


// to give score
//subject/id/givescore

router.get('/:idst/givescore/:idsu', function(req, res){
  Models.StudentSubject.findAll({
    where: {
      StudentId: req.params.idst,
      $and: {
        SubjectId: req.params.idsu
      }
    },
    include: [{all: true}]
  })
  .then(function(data){
    console.log('yyy', data);
    res.render('scorepage', {panggilData: data[0]})
  })
})

router.post('/:idst/givescore/:idsu', function(req, res){
  Models.StudentSubject.update({
    Score: req.body.Score
  },{
    where:{
      StudentId: req.params.idst,
      $and: {
        SubjectId: req.params.idsu
      }
    }
  })
  .then(function(){
    res.redirect(`subjects/${req.params.idsu}/enrolledstudents`)
  })
})




module.exports = router
