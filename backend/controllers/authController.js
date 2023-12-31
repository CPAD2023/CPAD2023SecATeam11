const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Employer = require('../models/Employer');

const handleSignup = async (req, res) => {
	try {
		console.log(req.body);
		const { username, password, isRecruiter } = req.body;

		if (!username || !password) {
			return res
				.status(400)
				.json({ message: 'Username and password are required' });
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (!passwordRegex.test(password)) {
			return res.status(400).json({
				message:
					'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.',
			});
		}

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			username,
			password: hashedPassword,
			isRecruiter,
		});
		await newUser.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const handleLogin = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
			expiresIn: '1h',
		});
		let userData = {};
		if (user.isRecruiter) {
			userData = await Employer.findOne({ id: user._id });
		} else {
			userData = await Employee.findOne({ id: user._id });
		}

		res.status(200).json({
			token,
			userId: user._id,
			isRecruiter: user.isRecruiter,
			userData: userData,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleSignup, handleLogin };
