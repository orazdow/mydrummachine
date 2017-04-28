var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true,
		unique: true
	},
	password: {
		type: String
	},
	 pat : {
		a: [],
		b: [],
		c: [],
		d: [],
		e: [],
		f: [],
		g: [],
		h: [],
	 len: Number,
	 bpm: Number,
	 set: String	
	 }
});

var User = module.exports = mongoose.model('User', UserSchema);