const mongoose = require('mongoose');
const ofersSchema = new mongoose.Schema({

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