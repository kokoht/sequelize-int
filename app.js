const express = require('express')
const index = require('./routers/index')
const teachers = require('./routers/teachers')
const subjects = require('./routers/subjects')
const students = require('./routers/students')

var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var path_name = path.join(__dirname, 'public')
var express_static = express.static(path_name)
app.use(express_static);

app.use('/', index);
app.use('/teachers', teachers);
app.use('/subjects', subjects);
app.use('/students', students);

app.listen(3000)
