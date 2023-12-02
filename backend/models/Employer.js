const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
	id: mongoose.SchemaTypes.ObjectId,
	fname: String,
	lname: String,
	company: String,
	profileImg: Buffer,
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
