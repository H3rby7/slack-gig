var express = require('express');
var router = express.Router();
var auftritt = require('../auftritt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('alive');
});

router.post('/', auftritt);

module.exports = router;
