const mongoose = require('mongoose');


var ExpressionSchema = mongoose.Schema({
    value: {
        type: String,
        required: false
    }
});

var Expression = mongoose.model("Expression", ExpressionSchema);
module.exports = Expression;