var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Tareas = mongoose.model('Tareas');

//GET - Listar tareas
router.get('/tareas', function(req, res, next){
  Tareas.find(function(err, tareas){
    if(err){
      return next(err)
    }
      res.json(tareas)
  })
})

module.exports = router;
