var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var DeskSchema = new Schema({
	'area' : Number
});

module.exports = mongoose.model('Desk', DeskSchema);
