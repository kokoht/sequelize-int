var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let activeUser = req.session.user
  res.render('index', { activeUser: activeUser});
});

router.get('/logout', function(req, res, next) {
  delete req.session.user
  res.redirect('/')
})

module.exports = router;
