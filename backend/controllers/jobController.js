const Employee = require('../models/Employee');
const Job = require('../models/Job');

const handleGetJobs = async (req, res) => {
	try {
		const jobs = await Job.find({});
		return res.status(200).json({ jobs });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handlePublishJob = async (req, res) => {
	try {
		if (req.body != null) {
			const job = new Job(req.body);
			job.save();
			return res.status(200);
		} else {
			return res.status(400).json({ message: 'Empty request body' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleGetJobs, handlePublishJob };
