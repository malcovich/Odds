var mongoose = require('mongoose');
module.exports = mongoose.model('Odd', {
	userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    home: String,
    away: String,
    type: String,
    bet: String,
    rate: Number, 
    value: Number,
    result: Number
}); 