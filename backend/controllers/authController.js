const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const handleSignup = async (req, res) => {
	try {
		const { username, password, isRecruiter } = req.body;

		// Check if the username or password is missing
		if (!username || !password) {
			return res
				.status(400)
				.json({ message: 'Username and password are required' });
		}

		// Check if the password meets criteria
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if (!passwordRegex.test(password)) {
			return res.status(400).json({
				message:
					'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.',
			});
		}

		// Check if the username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ message: 'Username already exists' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
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

		// Check if the user exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// Check if the password is correct
		const passwordMatch = await bcrypt.compare(password, user.password);
		if (!passwordMatch) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		// Generate a JWT token
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
			expiresIn: '1h',
		});

		res.status(200).json({
			token,
			userId: user._id,
			isRecruiter: user.isRecruiter,
		});
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = { handleSignup, handleLogin };
