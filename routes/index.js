var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
})

router.post('/entry', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({id: 'foo'}))
})

module.exports = router;
