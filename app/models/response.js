const mongoose = require('mongoose');


var ResponseSchema = mongoose.Schema({
    value: {
        type: String,
        required: false
    }
});

var Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;