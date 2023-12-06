const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
	fname: String,
	lname: String,
	company: String,
	profileImg: Buffer,
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
