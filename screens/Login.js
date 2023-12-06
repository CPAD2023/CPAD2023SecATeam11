import React, { useContext, useEffect, useState } from 'react';
import { Text, Button, TextInput } from 'react-native-paper';
import { View, StyleSheet, ImageBackground } from 'react-native';
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
				mode: 'no-cors',
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
			<ImageBackground
				blurRadius={2}
				source={require('../assets/background_login.jpg')}
				style={{ height: '100%', width: '100%', flex: 1 }}>
				<View style={styles.innerContainer}>
					<Text variant='displayMedium' style={styles.pageHeading}>
						Talentista
					</Text>
					<Text style={styles.pageHeading} variant='headlineSmall'>
						Welcome Back!
					</Text>
					<View style={styles.formContainer}>
						<Text style={styles.label} variant='titleLarge'>
							Username
						</Text>
						<TextInput
							style={styles.input}
							value={username}
							onChangeText={setUsername}
							mode='outlined'
							placeholder='Username'
						/>
						<Text style={styles.label} variant='titleLarge'>
							Password
						</Text>
						<TextInput
							style={styles.input}
							value={password}
							onChangeText={setPassword}
							secureTextEntry
							mode='outlined'
							placeholder='Password'
						/>
						<Button
							onPress={handleLogin}
							mode='contained'
							style={styles.button}>
							{' '}
							Login{' '}
						</Button>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: 'rgba(0,0,0, 0.5)',
		height: '100%',
	},
	formContainer: {
		textAlign: 'left',
		flex: 1,
		width: '100%',
		paddingTop: 100,
	},
	appName: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 16,
	},
	pageHeading: {
		margin: 10,
		color: 'white',
		fontWeight: 'bold',
	},
	label: { color: 'white', fontWeight: 'medium', padding: 5 },
	input: {
		width: '100%',
		height: 40,
		marginBottom: 16,
		paddingHorizontal: 8,
	},
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	checkbox: {
		marginRight: 5,
		borderRadius: 2,
		borderWidth: 2,
		borderColor: 'white',
	},
	linkText: {
		color: 'white',
		fontWeight: '800',
		textDecorationLine: 'underline',
		marginTop: 16,
	},
	button: {
		padding: 5,
		margin: 10,
	},
});

export default Login;
