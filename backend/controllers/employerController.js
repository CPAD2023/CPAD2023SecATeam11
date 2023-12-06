const Employer = require('../models/Employer');

const handleSaveProfile = async (req, res) => {
	try {
		if (req.body != null) {
			const id = req.body.id;

			if (!id) {
				return res
					.status(400)
					.json({ message: 'Missing id in the request body' });
			}

			const existingEmployer = await Employer.findById(id);

			if (existingEmployer) {
				const updateFields = {
					fname: req.body.fname || existingEmployer.fname,
					lname: req.body.lname || existingEmployer.lname,
					company: req.body.company || existingEmployer.company,
				};

				const updatedEmployer = await Employer.findByIdAndUpdate(
					id,
					{ $set: updateFields },
					{ new: true }
				);

				return res.status(201).json({ updatedEmployer });
			} else {
				const newEmployer = new Employer({
					_id: id,
					fname: req.body.fname,
					lname: req.body.lname,
					company: req.body.company,
				});

				const savedEmployer = await newEmployer.save();
				return res.status(201).json({ savedEmployer });
			}
		} else {
			return res.status(400).json({ message: 'Empty request body' });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleSaveProfile };
