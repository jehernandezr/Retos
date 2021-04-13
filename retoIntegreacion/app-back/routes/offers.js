var express = require('express');
var router = express.Router();
const Mongolib = require("../db/Mongolib");

/* GET home page. */
router.get('/', function (req, res, next) {
    Mongolib.getDatabase(db => {
        Mongolib.findDocuments(db, docs => {
            res.send(docs);
        })
    })
});

router.post('/', function (req, res, next) {
    let data =req.body;
    Mongolib.getDatabase(db => {
        Mongolib.saveDocuments(db, data, docs => {
            res.status(201).send(docs);
        })
    })
    

});

module.exports = router;