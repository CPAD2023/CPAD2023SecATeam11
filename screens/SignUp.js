import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { AppContext } from '../App';
import { Switch } from 'react-native-paper';

const SignUp = ({ navigation }) => {
	const { token } = useContext(AppContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isRecruiter, setIsRecruiter] = useState(false);
	const [error, setError] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	const handleSignUp = async () => {
		if (username.length == 0 || password.length == 0) {
			setError(true);
			setErrorMsg('Empty fields!');
		} else {
			setError(false);
			setErrorMsg('');
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
		}
	};

	useEffect(() => {
		if (token) {
			navigation.navigate('Dashboard');
		}
	}, [token, navigation]);

	return (
		<View style={styles.container}>
			<Text variant='displayLarge' style={[styles.appName, styles.text]}>
				Talentista
			</Text>
			<Text
				variant='headlineLarge'
				style={[styles.pageHeading, , styles.text]}>
				Signup Page
			</Text>
			{error && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
			<Text
				variant='headlineMedium'
				style={[styles.label, , styles.text]}>
				Username:
			</Text>
			<TextInput
				style={styles.input}
				value={username}
				onChangeText={setUsername}
			/>
			<Text
				variant='headlineMedium'
				style={[styles.label, , styles.text]}>
				Password:
			</Text>
			<TextInput
				style={styles.input}
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>
			<View style={styles.checkboxContainer}>
				<Switch value={isRecruiter} onValueChange={setIsRecruiter} />
				<Text
					variant='headlineSmall'
					style={[styles.label, , styles.text]}>
					Are you a recruiter?
				</Text>
			</View>
			<Button mode='contained-tonal' onPress={handleSignUp}>
				Sign Up
			</Button>

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
		paddingLeft: 8,
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
	text: {
		color: 'black',
	},
});

export default SignUp;
