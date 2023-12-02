const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
	id: { type: mongoose.SchemaTypes.ObjectId, required: true },
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	company: { type: String, required: true },
	profileImg: Buffer,
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
