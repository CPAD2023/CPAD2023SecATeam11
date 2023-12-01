const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	company: { type: String, required: true },
	skills: { type: [String], required: true },
	experience: {
		type: String,
		required: true,
		enum: ['0 - 2 years', '2 - 5 years', '5 years or more'],
		default: '0 - 2 years',
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
	postedBy: mongoose.SchemaTypes.ObjectId,
	appliedBy: [mongoose.SchemaTypes.ObjectId],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
