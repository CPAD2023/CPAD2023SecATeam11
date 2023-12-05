const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
	id: mongoose.SchemaTypes.ObjectId,
	fname: String,
	lname: String,
	experience: String,
	skills: [String],
	profileImg: Buffer,
	resume: Buffer,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
