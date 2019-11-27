var express = require('express');
var controller = require('../controllers/donhang.controller');
var upload = require('../handlers/multer.handler');

var router = express.Router();
router.get('/',controller.index);

module.exports = router;