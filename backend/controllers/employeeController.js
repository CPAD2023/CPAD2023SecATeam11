const Employee = require('../models/Employee');

const handleSaveProfile = async (req, res) => {
	try {
		const id = req.body.id;
		if (!id) {
			return res
				.status(400)
				.json({ message: 'Missing id in the request body' });
		}

		const existingEmployee = await Employee.findById(id);

		if (existingEmployee) {
			const updatedEmployee = await Employee.findByIdAndUpdate(
				id,
				{
					$set: {
						fname: req.body.fname || existingEmployee.fname,
						lname: req.body.lname || existingEmployee.lname,
						experience:
							req.body.experience || existingEmployee.experience,
						skills: req.body.skills || existingEmployee.skills,
					},
				},
				{ new: true }
			);

			return res.status(201).json({ updatedEmployee });
		} else {
			const newEmployee = new Employee({
				_id: id,
				fname: req.body.fname,
				lname: req.body.lname,
				experience: req.body.experience,
				skills: req.body.skills,
			});

			const savedEmployee = await newEmployee.save();
			return res.status(201).json({ savedEmployee });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleSaveProfile };
