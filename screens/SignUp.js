import React, { useContext, useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	Pressable,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { AppContext } from '../App';

const SignUp = ({ navigation }) => {
	const { token } = useContext(AppContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isRecruiter, setIsRecruiter] = useState(false);

	const handleSignUp = async () => {
		try {
			const apiUrl = 'http://localhost:3000/signup';

			const formData = new URLSearchParams();
			formData.append('username', username);
			formData.append('password', password);
			formData.append('isRecruiter', String(isRecruiter));

			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: formData.toString(),
			});

			if (!response.ok) {
				console.error('Error signing up:', response.statusText);
				return;
			} else {
				navigation.navigate('Login');
			}
		} catch (error) {
			console.error('Error signing up:', error.message);
		}
	};

	useEffect(() => {
		if (token) {
			navigation.navigate('Dashboard');
		}
	}, [token, navigation]);

	return (
		<View style={styles.container}>
			<Text style={styles.appName}>Talentista</Text>
			<Text style={styles.pageHeading}>Signup Page</Text>
			<Text style={styles.label}>Username:</Text>
			<TextInput
				style={styles.input}
				value={username}
				onChangeText={setUsername}
			/>
			<Text style={styles.label}>Password:</Text>
			<TextInput
				style={styles.input}
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<View style={styles.checkboxContainer}>
				<Checkbox value={isRecruiter} onValueChange={setIsRecruiter} />
				<Text style={styles.label}>Are you a recruiter?</Text>
			</View>
			<Button title='Sign Up' onPress={handleSignUp} />

			<Pressable onPress={() => navigation.navigate('Login')}>
				<Text style={styles.linkText}>
					Are you already a user? Login here
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 16,
	},
	appName: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	pageHeading: {
		fontSize: 20,
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 16,
		paddingHorizontal: 8,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 16,
	},
	linkText: {
		color: 'blue',
		textDecorationLine: 'underline',
		marginTop: 16,
	},
});

export default SignUp;
