const mongoose = require('mongoose');
const offersSchema = new mongoose.Schema({

    name:{
        type: String,
    },
    company:{
        type: String,
    },
    salary:{
        type: String,
    },
    city:{
        type: String,
    }

});
module.exports = mongoose.model('Offer', offersSchema);