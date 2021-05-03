
function (req, res, next) {
    let data =req.body;
    Mongolib.getDatabase(db => {
        Mongolib.saveDocuments(db, data, docs => {
            res.status(201).send(docs);
        })
    })
    

}

