const express = require('express');
const router = express.Router();
const offerControler = require('../controllers/offercontroller');
const middleware = require("../controllers/middleware");
/* GET home page. */



router.get('/',offerControler.getAllOffers)
router.use(middleware.protect)
router.use(middleware.restrictTo('company','admin'))
router.post('/', offerControler.createOffer);

module.exports = router;