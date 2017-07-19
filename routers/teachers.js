var express = require('express');
var router = express.Router();

const Models = require('../models');

// router.get('/', function(req, res){
//   Models.Teacher.findAll()
//   .then(function(data){
//     res.render('teacher', {
//       panggilData: data
//     })
//   })
// })

// ini kudune seng pake = get.. utk langsung akses.. v1..blm jln..
// router.get('/', function(req,res){
//   res.send('ok')
//   Models.Teacher.findAll()
//   .then(teacher => {
//   //  console.log(teacher[0]);  cuma akses 1 object.. kudu akses semua object
//     teacher.forEach(data => {
//       console.log(data.toJSON());
//       data.getSubject()
//       .then(subject => {
//         if (subject) console.log(subject.toJSON());
//       })
//     })
//    })
//  })

router.get('/', function(req, res){
 Models.Teacher.findAll({
   order: [['first_name', 'asc']]
 })
 .then(function(teacherInRows) {
   let promises = teacherInRows.map(teacherObject => {
     return new Promise (function (resolve, reject){
       teacherObject.getSubject()
       .then(subjectObject => {
         if(teacherObject.SubjectId == null){
           teacherObject.subject_name = 'belum dpt tugas'
         } else {
           teacherObject.subject_name = subjectObject.subject_name;
         }
         console.log('bbb',resolve(teacherObject));
         return resolve(teacherObject)
       })
       .catch(err => reject(err))
     })
   })
   Promise.all(promises)
   .then(function(teacherObject){
     console.log('eee',teacherObject);
     res.render('teacher', {
       panggilData: teacherObject,
       pageTitle: "Teacher's"
        })
      })
    })
 })


//================== insert di  /teachers/add
// router.get('/add', function(req, res){
//   res.render('addteacher')
// })

// ada di bawah.. (/add)

router.post('/', function(req, res){
  Models.Teacher.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  .then(function(){
    res.redirect('/teachers')
  })
  .catch(err => {
    res.render('errorpage', {
	     panggilData: err.message}
      )
    })
  })


//================= edit using sequelize syntax
router.get('/edit/:id', function(req, res){
  Models.Teacher.findById(req.params.id)
  .then(function(data){
    Models.Subject.findAll()
      .then(function(data1){
        res.render('editteacher', {
          panggilData: data,
          panggilDataDropdown: data1
        })
      })
    })
  })


router.post('/edit/:id', function(req,res){
  Models.Teacher.update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    SubjectId: req.body.SubjectId
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/teachers')
  })
  .catch(err => {
    res.render('errorpage', {
	     panggilData: err.message}
      )
    })
  });

  // panggil dropdown di edit..
  // router.get('/edit', function(req,res){
  //   Models.Subject.findAll()
  //   .then(function(data){
  //     res.render('editteacher', {
  //       panggilDataDropdown: data
  //     })
  //   })
  // })



// delete
router.get('/delete/:id', function(req, res){
  Models.Teacher.destroy({
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/teachers');
  })
});

// dibikin dlm fungsi sequelize...  (yg ini masih dlm bentuk promise.. )
// router.get('/', function(req,res) {
//   Address.findAllAddress(dbModel.connection)
//   .then(function(data1){
//     return Address.forDropdown(dbModel.connection)
//     .then(function(data2){
//       res.render('address', {
//       panggilData: data1,
//       panggilDataDropdown: data2
//       })
//       })
//     })
//   })

// cek utk 'forDropdown' ini apa sih? => sama dengan seq syntax e apa??
// 'forDropdown' ini adalah find all tapi yg dipanggil contact ( dlm kasus ini kudune = subject

// OK pake yg dibawah utk dropdown sdh bisaa.. ( yg atas /add dimatiin jg)
router.get('/add', function(req,res){
  Models.Subject.findAll()
  .then(function(data){
    res.render('addteacher', {
      panggilDataDropdown: data
    })
  })
})









module.exports = router
