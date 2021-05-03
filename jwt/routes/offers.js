const express = require('express');
const router = express.Router();
const offerControler = require('../controllers/offercontroller');

/* GET home page. */
router.get('/',offerControler)

router.post('/', offerControler);

module.exports = router;