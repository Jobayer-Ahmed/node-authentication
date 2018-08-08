const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	phone: {
		type: Number,
		unique: true
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	gender: {
		type: String
	},
	country: {
		type: String
	},
	
});

const Model = mongoose.model('User', UserSchema);

module.exports = Model;