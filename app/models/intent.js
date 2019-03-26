const mongoose = require('mongoose');


var IntentSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: false
    },
    expressions: {
        type: Array,
        required: false
    },
    responses: {
        type: Array
    }
});

IntentSchema.methods.makeKey = function (iString) {
    let allKeys = iString.split(' ');
    allKeys = allKeys.map(iKey => {
        iKey = iKey.charAt(0).toUpperCase() + iKey.slice(1);
        return iKey
    });
    let finalKey = allKeys.join('');
    finalKey = finalKey.charAt(0).toLowerCase() + finalKey.slice(1);
    return finalKey;
}

var Intent = mongoose.model("Intents", IntentSchema);
module.exports = Intent;