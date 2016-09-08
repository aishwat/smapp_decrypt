var express = require('express');
var router = express.Router();
var tmp = require('./tmp');

/* GET home page. */
router.get('/', tmp.retrieve);

module.exports = router;
