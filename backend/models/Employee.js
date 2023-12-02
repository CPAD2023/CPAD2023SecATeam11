const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	id: mongoose.SchemaTypes.ObjectId,
	fname: String,
	lname: String,
	experience: {
		type: String,
		enum: ['0 - 2 years', '2 - 5 years', '5 years or more'],
	},
	skills: [String],
	profileImg: Buffer,
	resume: Buffer,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
