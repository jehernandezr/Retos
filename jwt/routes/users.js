var express = require('express');
const middleware = require('../controllers/middleware');
var router = express.Router();
const userController = require('../controllers/usercontroller');

/* GET users listing. */
router.use(middleware.protect)
router.use(middleware.restrictTo('admin'))
router.get('/', userController.getAllUsers);

module.exports = router;
