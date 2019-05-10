const mongoose = require('mongoose');


var ResponseSchema = mongoose.Schema({
    intent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Intents",
        required: true
    },
    value: {
        type: String,
        required: false
    }
});

var Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;