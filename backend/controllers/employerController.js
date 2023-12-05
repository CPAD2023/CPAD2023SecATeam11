const Employer = require('../models/Employer');
const Job = require('../models/Job');

const handleSaveProfile = async (req, res) => {
	try {
		if (req.body != null) {
			const employer = new Employer(req.body);
			await employer.save();

			return res.status(201).json({ message: 'Profile Saved' });
		} else {
			return res.status(400).json({ message: 'Empty request body' });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handleUpdateProfile = async (req, res) => {
	try {
		const updatedEmployer = await Employer.findOneAndUpdate(
			{ fname: req.body.fname },
			{ lname: req.body.lname },
			{ company: req.body.company }
		);
		if (!updatedEmployer) {
			throw new Error();
		} else {
			return res.status(201).json({ updatedEmployer });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleSaveProfile, handleUpdateProfile };
