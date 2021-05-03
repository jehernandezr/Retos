var express = require('express');
var router = express.Router();

var middleware = require("../controllers/middleware");


/* GET home page. */
router.post('/login',middleware.login);
router.post('/signup',middleware.signup);
router.get('/logout',middleware.logout);

router.use(middleware.protect)
router.get('/');



module.exports = router;