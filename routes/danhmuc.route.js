var express = require('express');
var controller = require('../controllers/danhmuc.controller');
var upload = require('../handlers/multer.handler');

var router = express.Router();

router.get('/create', controller.create);

router.post('/create', upload.single('hinh'), controller.postCreate);
router.get('/',controller.index);
router.get('/view/:id',controller.view);
router.get('/delete/:id',controller.delete);
router.get('/edit/:id',controller.edit);
router.post('/update/:id',upload.single('hinh'),controller.update);
module.exports = router;