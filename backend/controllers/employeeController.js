const Employee = require('../models/Employee');
const Job = require('../models/Job');

const handleSaveProfile = async (req, res) => {
	try {
		console.log(req.body);
		if (req.body != null) {
			const employee = new Employee(req.body);
			await employee.save();

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
		const updatedEmployee = await Employee.findOneAndUpdate(
			{ fname: req.body.fname },
			{ lname: req.body.lname },
			{ experience: req.body.experience },
			{ $set: { skills: req.body.skills } }
		);
		if (!updatedEmployee) {
			throw new Error();
		} else {
			return res.status(201).json({ updatedEmployee });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleSaveProfile, handleUpdateProfile };
