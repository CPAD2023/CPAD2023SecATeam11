const Job = require('../models/Job');

const handleGetJobs = async (req, res) => {
	try {
		const jobs = await Job.find({});
		return res.status(200).json({ jobs: Array.isArray(jobs) ? jobs : [] });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handlePublishJob = async (req, res) => {
	try {
		const jobData = {
			...req.body,
			skills: req.body.skills.split(',').map((skill) => skill.trim()),
		};
		console.log(jobData);
		if (req.body != null) {
			// const job = new Job(req.body);
			const job = new Job(jobData);
			job.save();
			return res.status(200).json({ job });
		} else {
			return res.status(400).json({ message: 'Empty request body' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handleApplyJob = async (req, res) => {
	try {
		console.log(req.body);
		const { jobId, employeeId } = req.body;
		const job = await Job.findOneAndUpdate(
			{ _id: jobId },
			{ $push: { appliedBy: employeeId } },
			{ new: true }
		);

		return res.status(200).json({ job });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handleSetInactive = async (req, res) => {
	try {
		console.log(req.body);
		const { jobId, employeeId } = req.body;
		const job = await Job.findOneAndUpdate(
			{ _id: jobId },
			{
				$pull: { appliedBy: employeeId },
				$push: { inactiveFor: employeeId },
			},
			{ new: true }
		);

		return res.status(200).json({ job });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handleDeleteJob = async (req, res) => {
	try {
		console.log(req.body);
		const { jobId, employeeId } = req.body;
		const job = await Job.findByIdAndDelete({ _id: jobId });

		return res.status(200).json({ job });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = {
	handleGetJobs,
	handlePublishJob,
	handleApplyJob,
	handleSetInactive,
	handleDeleteJob,
};
