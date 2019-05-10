const mongoose = require('mongoose');


var ExpressionSchema = mongoose.Schema({
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

var Expression = mongoose.model("Expression", ExpressionSchema);
module.exports = Expression;