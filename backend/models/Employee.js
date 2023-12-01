const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	id: { type: mongoose.SchemaTypes.ObjectId, required: true },
	fname: { type: String, required: true },
	lname: { type: String, required: true },
	experience: {
		type: String,
		required: true,
		enum: ['0 - 2 years', '2 - 5 years', '5 years or more'],
		default: '0 - 2 years',
	},
	skills: { type: [String], required: true },
	profileImg: Buffer,
	resume: Buffer,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
