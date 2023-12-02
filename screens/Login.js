import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { AppContext } from '../App';

const Login = ({ navigation }) => {
	const { setUserData, token, setToken, setUserId, setIsRecruiter } =
		useContext(AppContext);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async () => {
		try {
			const apiUrl = 'http://localhost:3000/login';

			const formData = new URLSearchParams();
			formData.append('username', username);
			formData.append('password', password);

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
				const responseData = await response.json();
				console.log(responseData);
				if (responseData.user != null) {
					setUserData(responseData.userData);
				}
				setUserId(responseData.userId);
				setIsRecruiter(responseData.isRecruiter);
				setToken(responseData.token);
				navigation.navigate('Dashboard');
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
			<Text style={styles.pageHeading}>Login Page</Text>
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
			<Button title='Login' onPress={handleLogin} />
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
});

export default Login;
