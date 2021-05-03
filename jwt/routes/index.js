var express = require('express');
var router = express.Router();

var HandlerGenerator = require("../controllers/handlergenerator");
var middleware = require("../controllers/middleware");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

router.post('/login', HandlerGenerator.login);

module.exports = router;