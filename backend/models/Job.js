const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
	role: String,
	description: String,
	company: String,
	skills: [String],
	experience: String,
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
	postedBy: mongoose.SchemaTypes.ObjectId,
	appliedBy: [mongoose.SchemaTypes.ObjectId],
	inactiveFor: [mongoose.SchemaTypes.ObjectId],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
